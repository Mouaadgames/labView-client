import Image from "next/image";

export default function Home() {
  return (
    <>
    

      <div className="absolute w-full h-screen overflow-hidden z-0">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="images/3195727-hd_1280_720_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      

      <section className="relative z-10 text-center py-32 px-4 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4 lang"
          data-en="Welcome to Labview"
          data-ar="مرحبًا بك في لابفيو"
          data-fr="Bienvenue à Labview">Welcome to Labview</h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 lang"
          data-en="AI-powered health analysis made simple."
          data-ar="تحليل صحي مدعوم بالذكاء الاصطناعي بطريقة بسيطة."
          data-fr="Analyse de santé alimentée par l'IA, simplifiée.">
          AI-powered health analysis made simple.
        </p>

        <a href="testanalysis.html" className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition lang"
          data-en="View Your Test" data-ar="عرض اختبارك" data-fr="Voir votre test">View Your Test</a>
      </section>
    </>
  );
}
