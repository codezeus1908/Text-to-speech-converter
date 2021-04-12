
 const synth=window.speechSynthesis;

 const textForm=document.querySelector('form');
 const textInput=document.querySelector('#text-input');
 const voiceSelect=document.querySelector('#voice-select');
 const rate=document.querySelector('#rate');
 const rateValue=document.querySelector('#rate-value');
 const pitch=document.querySelector('#pitch');
 const pitchValue=document.querySelector('#pitch-value');
 const body=document.querySelector('body');

 let voices=[];
 const getVoices=()=>{

    voices=synth.getVoices();
    //loop through voices
    voices.forEach(voice=>{
     const option=document.createElement('option');
     //Fill option with voice
     option.textContent=voice.name +'(' + voice.lang +')';

     //set needed option attributes
     option.setAttribute('data-lang',voice.lang);
     option.setAttribute('data-name',voice.name);
     voiceSelect.appendChild(option);
    });
 };
 getVoices();
 if(synth.onvoiceschanged!==undefined)
 {
     synth.onvoiceschanged=getVoices;
 }

const speak=()=>{

    body.style.background='#0E0B16 url(images/wave.gif)';
    body.style.backgroundRepeat='repeat-x';
    body.style.backgroundSize='100% 100%';
    if(synth.speaking)
    {
        console.error('Already speaking...');
        return ;

    }
    if(textInput.value!== '')
    {
     const speakText=new SpeechSynthesisUtterance(textInput.value);
     speakText.onend= e =>{
        console.log('Done speaking...');
        body.style.background='#0E0B16';
     }

    //Speak error
    speakText.onerror= e =>{
        console.error('Something went wrong');
    }

    //Selected Voice
     const selectedVoice=voiceSelect.selectedOptions[0]
     .getAttribute('data-name');
          
    //Loop through voices
    voices.forEach(voice=>{
      if(voice.name===selectedVoice)
      {
          speakText.voice=voice;
      }
    });
    speakText.rate=rate.value;
    speakText.pitch=pitch.value;
    synth.speak(speakText);
    }
};

//Event Listeners


//Text form Submit
textForm.addEventListener('submit',e=>{
e.preventDefault();
speak();
textInput.blur();

});
//Rate change

rate.addEventListener('change',e=>rateValue.textContent=rate.value);
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);


// voice select change
voiceSelect.addEventListener('change',e=>speak());

