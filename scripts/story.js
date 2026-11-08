'use strict';

// Split by literal source anchors. Every character remains in exactly one part.
function splitStory(text, steps) {
  const positions=steps.map((step,i)=>i===0?0:text.indexOf(step.inicio));
  if(positions.some((position,i)=>position<0||(i>0&&position<=positions[i-1])))
    throw new Error('Revisa els inicis dels apartats a narrativa.json');
  return steps.map((step,i)=>({...step,text:text.slice(positions[i],positions[i+1]??text.length).trim()}));
}
function storyMedia(ids=[]) {
  return ids.map(id=>{
    const media=PORTFOLIO.media.find(m=>m.id===id)||editableImage(id);
    if(!media)throw new Error('Recurs no trobat: '+id);
    return photoFigure(media,mediaTitle(media));
  }).join('');
}
function storyUnit(title,text,images,tone='',index=0) {
  return `<section class="section-pad story-unit ${text.length<650?'story-compact':''} ${tone?'tone-'+tone:''}"><div class="container"><span class="chapter-label">${formatIndex(index+1)} · Natura viva</span><h2 class="chapter-heading">${esc(title)}</h2><div class="story-layout ${index%2?'visual-first':''}"><div>${prose(text,'original-reflection')}</div><div class="story-visual">${storyMedia(images)}</div></div></div></section>`;
}

// The original table was flattened by transcription. Cells stay literal source slices.
function materialsTable(text) {
 const categories=WEB.narrativa.materials_categories;
 const positions=categories.map(label=>text.indexOf(label));
 if(positions.some((p,i)=>p<0||(i>0&&p<=positions[i-1])))return prose(text,'original-reflection');
 return `<table class="materials-table"><thead><tr><th>Categoria</th><th>Materials</th></tr></thead><tbody>${categories.map((label,i)=>`<tr><th scope="row">${esc(label)}</th><td>${esc(text.slice(positions[i]+label.length,positions[i+1]??text.length).trim())}</td></tr>`).join('')}</tbody></table>`;
}
