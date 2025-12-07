
import React, { Component } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
            <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold font-poppins text-gray-800">Something went wrong.</h1>
            <p className="text-gray-600 mt-2 mb-4 font-merriweather">An unexpected error occurred. Please try again.</p>
            <details className="bg-red-50 p-3 rounded-lg text-left text-xs text-red-700 mb-6">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap break-words">
                    {this.state.error?.toString()}
                </pre>
            </details>
            <Button onClick={() => window.location.reload()} className="bg-[#a0291f] hover:bg-[#7a1f17]">
                Try Again
            </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
