import React, { useState } from 'react';
import { soundFX } from '../../services/sound';
import { Terminal, AlertOctagon, CheckCircle2, RotateCcw } from 'lucide-react';

export const LogsApp: React.FC = () => {
  const [dilemmaChoice, setDilemmaChoice] = useState<'none' | 'military' | 'quiet'>('none');

  const logs = [
    { time: '01:10:45', speaker: 'NANO', role: 'EXUN Agent', text: 'We’re inside Wenoti Arcade on 92nd Avenue. Kids outside were whispering about this place being a sketchy front. It’s pitch black in here except for one cabinet shining.', color: 'text-retroblue-cyan' },
    { time: '01:11:30', speaker: 'MEGA', role: 'EXUN Agent', text: 'Look at cabinet #01. "The Reckoning: Origins". Someone is hunched over the controls. Look at his back...', color: 'text-retropink-rose' },
    { time: '01:12:02', speaker: 'MEGA', role: 'EXUN Agent', text: 'Leather glove... a scabbard... and a bright blue shirt. Nano, the machine hardware ID was a cipher that read "blueshirt". He actually cosplayed the main character.', color: 'text-retropink-rose' },
    { time: '01:12:45', speaker: 'NANO', role: 'EXUN Agent', text: 'Walking up to him now. Keep your hand on your sidearm.', color: 'text-retroblue-cyan' },
    { time: '01:13:02', speaker: 'NANO', role: 'EXUN Agent', text: '“Hey mister... can I play after you?”', color: 'text-retroyellow-bright font-bold' },
    { time: '01:13:08', speaker: 'BOILER', role: 'Suspect', text: '*(Flinches violently, visibly shaking)* “Agh! Uh... ja! Sure! Just vaiting for ze level to finish, you know?” *(Puts on a thick, atrocious fake European accent)*', color: 'text-retropink-neon' },
    { time: '01:13:20', speaker: 'MEGA', role: 'EXUN Agent', text: '“Save the accent, Mr. Boiler. We know who you are. And why are you staring at your bare wrist?”', color: 'text-retropink-rose' },
    { time: '01:13:28', speaker: 'BOILER', role: 'Suspect', text: '*(Looks at bare wrist in sheer panic, facade collapsing)* “He took it out... Teo took the Character class out! It’s not a game, it’s a—”', color: 'text-retropink-neon font-bold' },
    { time: '01:13:42', speaker: 'SYSTEM', role: 'Telemetry', text: 'CRITICAL ALERT: CABINET #92 RESONATOR ENGAGED. CATHODE TUBE WARBLING AT 14.8 KHZ.', color: 'text-retrogreen-neon font-pixel' },
    { time: '01:13:58', speaker: 'SYSTEM', role: 'Telemetry', text: 'SPARKS DETECTED. PHOTON EMISSION AT 99.98% PURITY. GRAVITATIONAL DILATION IN EFFECT.', color: 'text-retrogreen-neon font-pixel' },
    { time: '01:14:08', speaker: 'NANO', role: 'EXUN Agent', text: '“MEGA! GRAB THE RAILING! PULL BACK!”', color: 'text-retroblue-cyan font-bold' },
    { time: '01:14:14', speaker: 'MEGA', role: 'EXUN Agent', text: '“I can’t hold on! Nano, Boiler is gone—he was pulled inside! It’s grabbing me next—tell my—!”', color: 'text-retropink-rose font-bold' },
    { time: '01:14:25', speaker: 'SYSTEM', role: 'Telemetry', text: 'LIGHT BLAST ZERO EVENT. ALL BIOSIGNALS INSIDE 3-METER RADIUS SUBSUMED. TRANSMISSION END.', color: 'text-retroyellow-pure font-pixel' },
    { time: '01:17:40', speaker: 'NANO', role: 'EXUN Agent', text: '*(Waking up disoriented. Severe abrasions on hands and knees. Arcade floor is burned).* Mega? Boiler? ...Nobody is here. Just the cabinet humming in the dark.', color: 'text-retropurple-100 italic' },
  ];

  const handleChoice = (choice: 'military' | 'quiet') => {
    soundFX.playWarble();
    setDilemmaChoice(choice);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-retropurple-100">
      {/* Header */}
      <div className="bg-retropurple-900 border border-retropurple-500 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-retrogreen-neon" />
          <h2 className="text-sm font-pixel text-retrogreen-neon">
            LOGS.EXE // INCIDENT 23-OCT TRANSCRIPT
          </h2>
        </div>
        <span className="text-[10px] text-retroyellow-cream">
          RECON AUDIO: CH-92 VERIFIED
        </span>
      </div>

      {/* Transcript Terminal */}
      <div className="bevel-inset bg-black/75 p-3.5 max-h-64 overflow-y-auto space-y-2.5 font-mono text-xs">
        {logs.map((log, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            <span className="text-[10px] text-retropurple-300 font-pixel flex-shrink-0">
              [{log.time}]
            </span>
            <div className="flex-1">
              <span className={`font-pixel text-[10px] mr-1.5 ${log.color}`}>
                {log.speaker}:
              </span>
              <span className="text-retropurple-100">{log.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Nano's Critical Dilemma Decision Terminal */}
      <div className="bevel-outset bg-retropurple-900/90 p-4 border border-retroblue-cyan/60 space-y-3">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-retroyellow-pure animate-pulse" />
          <h3 className="font-pixel text-xs text-retroyellow-bright">
            NANO'S CRITICAL CHOICE // SUBMIT FIELD REPORT
          </h3>
        </div>
        <p className="text-xs text-retropurple-100 leading-relaxed">
          “Nano loses recollection and is disoriented. Mega is gone too. Nano submits all he can recollect to the authorities and higher-ups. Nano has a choice now: report it to the government, possibly even alarm the military. Or, he can stay quiet to not get involved now...”
        </p>

        {dilemmaChoice === 'none' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleChoice('military')}
              className="p-3 bg-retropink-neon/20 hover:bg-retropink-neon hover:text-black border border-retropink-neon bevel-button text-left space-y-1 transition-all"
            >
              <div className="font-pixel text-[10px] text-retropink-neon hover:text-black">
                [CHOICE A] ALARM THE MILITARY
              </div>
              <p className="text-[10px] text-retropurple-100 hover:text-black">
                Mobilize armed forces and federal scientists to quarantine Wenoti Arcade. Risk starting a panic and getting Mega permanently quarantined as code.
              </p>
            </button>

            <button
              onClick={() => handleChoice('quiet')}
              className="p-3 bg-retroblue-midnight/80 hover:bg-retroblue-cyan hover:text-black border border-retroblue-cyan bevel-button text-left space-y-1 transition-all"
            >
              <div className="font-pixel text-[10px] text-retroblue-cyan hover:text-black">
                [CHOICE B] STAY QUIET & GO UNDERCOVER
              </div>
              <p className="text-[10px] text-retropurple-100 hover:text-black">
                Bury the official report. Enter the machine yourself to find Mega and Boiler before the government dismantles the power grid.
              </p>
            </button>
          </div>
        ) : (
          <div className="bevel-inset bg-black/80 p-3.5 space-y-2 border border-retrogreen-neon">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[10px] text-retrogreen-neon flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                TIMELINE RECORDED: {dilemmaChoice === 'military' ? 'MILITARY ESCALATION' : 'SOLITARY CRUSADE'}
              </span>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setDilemmaChoice('none');
                }}
                className="text-[9px] font-pixel text-retropurple-300 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> RECONSIDER
              </button>
            </div>

            {dilemmaChoice === 'military' && (
              <p className="text-xs text-retropink-soft leading-relaxed">
                Tanks and bio-digital hazard teams encircle 92nd Avenue. The arcade is sealed in concrete. But deep in the core, the machine begins hacking the military defense satellites. Without someone inside to finish the game, the empty Character class begins pulling in the entire city’s power grid.
              </p>
            )}

            {dilemmaChoice === 'quiet' && (
              <p className="text-xs text-retroblue-cyan leading-relaxed">
                Nano keeps the folder hidden in an old floppy disk. He stands alone before cabinet #01 in the dead of night, slipping on Boiler's dropped leather glove. He inserts a coin. The screen flickers to life: “CONTINUE THE GAME?.. 09”. Nano presses 1-PLAYER START.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
