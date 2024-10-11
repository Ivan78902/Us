import React, { useState, useRef } from 'react';
import { Heart, PlusCircle, Trash2, Edit2 } from 'lucide-react';
import { Photo } from '../data/photos';

const PhotoAlbum: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showSurprise, setShowSurprise] = useState(false);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const caption = prompt("Enter a caption for this photo:", file.name);
        const newPhoto: Photo = {
          id: Date.now().toString(),
          src: e.target?.result as string,
          caption: caption || file.name,
        };
        setPhotos([...photos, newPhoto]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  const updateCaption = (id: string, newCaption: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, caption: newCaption } : photo
    ));
    setEditingCaption(null);
  };

  return (
    <div className="bg-peach py-16">
      <h2 className="text-4xl font-script text-center text-burgundy mb-12">Our Precious Moments</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-frame relative">
              <img 
                src={photo.src} 
                alt={photo.caption} 
                className="w-full h-64 object-cover cursor-pointer" 
                onClick={() => setSelectedPhoto(photo)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                {editingCaption === photo.id ? (
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updateCaption(photo.id, e.target.value)}
                    onBlur={() => setEditingCaption(null)}
                    className="w-full bg-transparent border-b border-white"
                    autoFocus
                  />
                ) : (
                  <p className="text-sm truncate">{photo.caption}</p>
                )}
              </div>
              <button
                onClick={() => removePhoto(photo.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 text-burgundy hover:text-rose-gold transition-colors duration-300"
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={() => setEditingCaption(photo.id)}
                className="absolute top-2 right-10 bg-white rounded-full p-1 text-burgundy hover:text-rose-gold transition-colors duration-300"
              >
                <Edit2 size={20} />
              </button>
            </div>
          ))}
          <div 
            className="photo-frame flex items-center justify-center cursor-pointer bg-white bg-opacity-50"
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusCircle size={40} className="text-rose-gold" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={addPhoto}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <img src={selectedPhoto.src} alt={selectedPhoto.caption} className="w-full h-auto mb-4" />
            <p className="text-center text-lg mb-4">{selectedPhoto.caption}</p>
            <button onClick={() => setSelectedPhoto(null)} className="bg-rose-gold text-white font-sans py-2 px-6 rounded-full hover:bg-burgundy transition duration-300 block mx-auto">
              Close
            </button>
          </div>
        </div>
      )}
      <div className="text-center mt-8">
        <button
          className="bg-rose-gold text-white font-sans py-2 px-6 rounded-full hover:bg-burgundy transition duration-300 flex items-center mx-auto"
          onClick={() => setShowSurprise(!showSurprise)}
        >
          <Heart className="mr-2" size={20} />
          {showSurprise ? 'Hide Surprise' : 'Reveal Surprise'}
        </button>
      </div>
      {showSurprise && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-script text-burgundy">I love you more than words can express, Shernice!</p>
          <img src="/images/surprise.jpg" alt="Surprise" className="mt-4 mx-auto rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default PhotoAlbum;