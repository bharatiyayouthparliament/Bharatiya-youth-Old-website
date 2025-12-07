
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const GalleryGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imagePlacements = [
    { title: "Event Highlights", key: "highlights" },
    { title: "Delegate Participation", key: "delegates" },
    { title: "Closing Ceremony", key: "ceremony" },
    { title: "Media Coverage", key: "media" },
  ];

  const groupedImages = imagePlacements.map(placement => ({
    ...placement,
    items: images.filter(img => img.placement === placement.key)
  })).filter(group => group.items.length > 0);

  return (
    <div>
      {groupedImages.map(group => (
        <div key={group.key} className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 font-poppins">{group.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.items.map((image, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setSelectedImage(image.image)}
              >
                <img
                  class="w-full h-full object-cover aspect-square"
                  alt={`${group.title} - Image ${index + 1}`}
                 src="https://images.unsplash.com/photo-1684298598407-7ed4648eb93a" />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-2 bg-transparent border-none">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                <img src={selectedImage} alt="Enlarged view" className="w-full h-auto rounded-lg" />
                 <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-gray-800">
                    <X className="h-6 w-6"/>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryGrid;
