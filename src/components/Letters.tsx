import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Letter {
  id: string;
  author: string;
  content: string;
  date: string;
}

const Letters: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [newLetter, setNewLetter] = useState({ author: '', content: '' });

  const addLetter = () => {
    if (newLetter.author && newLetter.content) {
      const letter: Letter = {
        id: Date.now().toString(),
        author: newLetter.author,
        content: newLetter.content,
        date: new Date().toLocaleDateString()
      };
      setLetters([...letters, letter]);
      setNewLetter({ author: '', content: '' });
    }
  };

  const removeLetter = (id: string) => {
    setLetters(letters.filter(letter => letter.id !== id));
  };

  return (
    <div className="bg-lavender py-16">
      <h2 className="text-4xl font-script text-center text-burgundy mb-12">Our Love Letters</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {letters.map((letter) => (
            <div key={letter.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-script text-rose-gold mb-2">From {letter.author}</h3>
              <p className="text-sm text-plum mb-4">{letter.date}</p>
              <p className="text-plum mb-4">{letter.content}</p>
              <button
                onClick={() => removeLetter(letter.id)}
                className="text-burgundy hover:text-rose-gold transition-colors duration-300"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-script text-center text-burgundy mb-4">Write a New Letter</h3>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={newLetter.author}
              onChange={(e) => setNewLetter({ ...newLetter, author: e.target.value })}
              placeholder="Your Name"
              className="w-full mb-4 p-2 rounded"
            />
            <textarea
              value={newLetter.content}
              onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
              placeholder="Write your letter here..."
              className="w-full h-32 mb-4 p-2 rounded"
            />
            <button
              onClick={addLetter}
              className="bg-rose-gold text-white font-sans py-2 px-6 rounded-full hover:bg-burgundy transition duration-300 flex items-center mx-auto"
            >
              <PlusCircle size={20} className="mr-2" />
              Add Letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letters;