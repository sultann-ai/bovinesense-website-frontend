import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroBgWrapper from '../components/common/HeroBgWrapper';
import { recognitionsService } from '../services/recognitionsService';
import { Recognition } from '../types';

const Recognitions = () => {
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);

  const trustedRecognitions = recognitions.filter((recognition) => (recognition.section || 'trusted') === 'trusted');
  const eventRecognitions = recognitions.filter((recognition) => recognition.section === 'recognitions');

  useEffect(() => {
    const loadRecognitions = async () => {
      try {
        const recognitionData = await recognitionsService.getAll();
        setRecognitions(recognitionData);
      } catch (error) {
        console.error('Error loading recognitions:', error);
      }
    };

    loadRecognitions();
  }, []);

  return (
    <>
      <Helmet>
        <title>Recognitions - BovineSense</title>
        <meta name="description" content="Organizations and institutions that recognize BovineSense." />
      </Helmet>

      <HeroBgWrapper>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Recognitions</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Trusted by institutions and recognized for our commitment to meaningful innovation.
          </p>
        </div>
      </HeroBgWrapper>

      <main className="py-20 bg-white dark:bg-gray-900">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Trusted and recognized by
          </h2>

          {trustedRecognitions.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {trustedRecognitions.map((recognition) => {
                const content = (
                  <div className="h-40 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary-500 transition-colors">
                    <img src={recognition.image} alt={recognition.name} className="max-h-20 max-w-full object-contain" />
                    <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">{recognition.name}</span>
                  </div>
                );
                return recognition.website ? (
                  <a key={recognition._id} href={recognition.website} target="_blank" rel="noopener noreferrer">{content}</a>
                ) : <div key={recognition._id}>{content}</div>;
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Trusted organizations will be displayed here.</p>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Recognitions
          </h2>
          {eventRecognitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventRecognitions.map((recognition) => {
                const content = (
                  <div className="h-full overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-primary-500 transition-colors">
                    <img src={recognition.image} alt={recognition.name} className="w-full aspect-[4/3] object-cover" />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{recognition.name}</h3>
                    </div>
                  </div>
                );
                return recognition.website ? <a key={recognition._id} href={recognition.website} target="_blank" rel="noopener noreferrer">{content}</a> : <div key={recognition._id}>{content}</div>;
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Meetups, forums, expos, and other recognitions will be displayed here.</p>
          )}
        </section>

      </main>
    </>
  );
};

export default Recognitions;
