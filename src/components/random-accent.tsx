/**
 * Picks a fresh accent/primary hue on every page load and applies it as inline
 * CSS variables before first paint (so there is no color flash). The hue is
 * re-derived when the theme class flips, using theme-appropriate lightness and
 * saturation, and an auto-contrasting foreground for text on the accent.
 *
 * Not persisted on purpose — each refresh is a different color.
 */
export function RandomAccentScript() {
  const code = `(function(){
  function hslToRgb(h,s,l){
    s/=100;l/=100;
    var c=(1-Math.abs(2*l-1))*s;
    var x=c*(1-Math.abs((h/60)%2-1));
    var m=l-c/2,r=0,g=0,b=0;
    if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}
    else if(h<180){g=c;b=x;}else if(h<240){g=x;b=c;}
    else if(h<300){r=x;b=c;}else{r=c;b=x;}
    return [Math.round((r+m)*255),Math.round((g+m)*255),Math.round((b+m)*255)];
  }
  var hue=Math.floor(Math.random()*360);
  function apply(){
    var dark=!document.documentElement.classList.contains('light');
    var rgb=dark?hslToRgb(hue,72,64):hslToRgb(hue,70,46);
    var triple=rgb[0]+' '+rgb[1]+' '+rgb[2];
    var s=document.documentElement.style;
    s.setProperty('--accent','rgb('+triple+')');
    s.setProperty('--primary','rgb('+triple+')');
    s.setProperty('--accent-rgb',triple);
    s.setProperty('--ring','rgb('+triple+' / 0.5)');
    var fg=dark?'oklch(0.20 0.03 '+hue+')':'oklch(0.99 0.01 '+hue+')';
    s.setProperty('--accent-foreground',fg);
    s.setProperty('--primary-foreground',fg);
  }
  apply();
  try{
    new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  }catch(e){}
})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
