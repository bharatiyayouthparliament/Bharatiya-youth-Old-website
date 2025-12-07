
import React from 'react';

// Credit: https://github.com/emilkowalski/vaul/blob/main/src/use-mounted.ts
function useMounted(callback) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    return () => {
      if (callback) {
        callback();
      }
    };
  }, [callback]);

  return isMounted;
}

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let memoryState = {
  toasts: [],
};

const listeners = [];

const toast = (props) => {
  const id = Math.random().toString(36).slice(2, 11);

  const dismiss = () => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
  };

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update: (props) => dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } }),
  };
};

const dispatch = (action) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', toastId });
        }, TOAST_REMOVE_DELAY);
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }

  return state;
};

function useToast() {
  const [state, setState] = React.useState(memoryState);

  useMounted(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  });

  React.useEffect(() => {
    state.toasts.forEach((t) => {
      let timeout;
      if (t.duration !== Infinity && t.duration > 0) {
        timeout = setTimeout(() => {
          t.onOpenChange(false);
        }, t.duration);
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    });
  }, [state.toasts]);

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

export { useToast, toast };
