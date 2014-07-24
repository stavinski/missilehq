(function (global) {
    "use strict";
   
    var soundPool = [],
        missile1 = null,
        missile2 = null,
        missile3 = null,
        soundsLoaded = 0,
        audioType = null,
            
        MAX_SOUNDS = 3;
    
    function supportedAudioFormat() {
        var audio = global.document.createElement('audio');
        
        if (audio.canPlayType("audio/ogg") =="probably" ||
            audio.canPlayType("audio/ogg") == "maybe") {
            return "ogg";   } 
        else if(audio.canPlayType("audio/wav") =="probably" ||
            audio.canPlayType("audio/wav") == "maybe") {
            return "wav";
        } else if(audio.canPlayType("audio/mp3") == "probably" ||
            audio.canPlayType("audio/mp3") == "maybe") {
            return "mp3";
        }
        
        return '';
    }
    
    function soundLoaded(cb) {
        return function () {
            soundsLoaded++;
        
            if (soundsLoaded === 3) {
                missile1.removeEventListener('canplaythrough', soundLoaded, false);
                missile2.removeEventListener('canplaythrough', soundLoaded, false);
                missile3.removeEventListener('canplaythrough', soundLoaded, false);

                soundPool.push({ name: 'missile', element: missile1, played: false});
                soundPool.push({ name: 'missile', element: missile2, played: false});
                soundPool.push({ name: 'missile', element: missile3, played: false});
                
                cb();
            }
        };
    }
    
    var sounds = {
        initialize: function (cb) {
            audioType = supportedAudioFormat();
            if (audioType === '') {
                console.log('audio formats not supported');
                return;
            }
            
            missile1 = global.document.createElement('audio');
            missile1.addEventListener('canplaythrough', soundLoaded(cb), false);
            global.document.body.appendChild(missile1);
            missile1.setAttribute('src', 'sounds/missile.' + audioType);
            
            missile2 = global.document.createElement('audio');
            missile2.addEventListener('canplaythrough', soundLoaded(cb), false);
            global.document.body.appendChild(missile2);
            missile2.setAttribute('src', 'sounds/missile.' + audioType);
            
            missile3 = global.document.createElement('audio');
            missile3.addEventListener('canplaythrough', soundLoaded(cb), false);
            global.document.body.appendChild(missile3);
            missile3.setAttribute('src', 'sounds/missile.' + audioType);
        },
        playSound: function (sound, volume) {
            var soundFound = false;
            var soundIndex = 0;
            var tempSound;

            if (soundPool.length > 0) {
                while (!soundFound && soundIndex < soundPool.length) {
                    var tSound = soundPool[soundIndex];
                    if ((tSound.element.ended || !tSound.played) && 
                        tSound.name == sound) {
                        soundFound = true;
                        tSound.played = true;
                    } else {
                        soundIndex++;
                    }
                }
            }
            
            if (soundFound) {
                tempSound = soundPool[soundIndex].element;
                tempSound.volume = volume;
                tempSound.play();

            } else if (soundPool.length < MAX_SOUNDS){
                tempSound = document.createElement("audio");
                tempSound.setAttribute("src", sound + "." + audioType);
                tempSound.volume = volume;
                tempSound.play();
                soundPool.push({name:sound, element:tempSound, type:audioType, 
                                 played:true});
            }
        }
    };
        
    global.Sounds = sounds;
    global.SoundsFXs = {
        MISSILE: 'missile'
    };
}(window));