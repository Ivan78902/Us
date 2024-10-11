import React, { useState, useEffect } from 'react';
import Letters from './Letters';

const LoveLetter: React.FC = () => {
  const [visibleText, setVisibleText] = useState('');
  const fullText = `My dearest Shernice,

Every day with you is a blessing, a gift that I cherish with all my heart. Your smile lights up my world, and your love gives me strength I never knew I had. You are my best friend, my soulmate, and my everything.

I promise to love you, support you, and stand by your side through all of life's adventures. You make me want to be a better person, and I am so grateful for your presence in my life.

Here's to our love, our journey, and our future together. I love you more than words can express.

Forever yours,
Ivan`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setVisibleText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="bg-lavender py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-script text-center text-burgundy mb-12">A Letter from the Heart</h2>
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mb-16">
          <pre className="font-sans text-plum whitespace-pre-wrap">{visibleText}</pre>
        </div>
        <Letters />
      </div>
    </div>
  );
};

export default LoveLetter;