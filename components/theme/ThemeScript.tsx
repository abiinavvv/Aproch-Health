export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("hero-video-mode");if(t==="night"){document.documentElement.setAttribute("data-theme","night");document.documentElement.style.colorScheme="dark";}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
