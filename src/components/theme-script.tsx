export const THEME_STORAGE_KEY = "theme";

/** Applies the saved theme before paint. Dark is the default, as in the design. */
export function ThemeScript() {
  const script = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
