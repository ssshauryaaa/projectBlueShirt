import React, { useState } from 'react';
import { soundFX } from '../../services/sound';
import { Search, Cpu, Sparkles } from 'lucide-react';

export const EvidenceApp: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [decoded, setDecoded] = useState<boolean>(false);

  const evidenceList = [
    {
      id: 1,
      tag: 'EV-01',
      title: 'THE "BLUE SHIRT" COSPLAY DISGUISE',
      category: 'Physical Evidence',
      badgeColor: 'text-retroblue-cyan',
      description: 'Retrieved from the arcade cabinet floor. An elven fantasy tunic in bright cyan-blue (#00FFFF), worn by bureaucrat Paul Boiler. Accompanied by a weathered leather glove and a back-scabbard.',
      analysis: 'Forensic tags show high dielectric charge. The garment acted as an anchor for the arcade machine’s cipher transmission. Boiler believed dressing as the missing protagonist would allow him to bypass the game’s lockouts.',
      metadata: 'Recovered: 23 Oct 01:50 | Wenoti Arcade, 92nd Ave',
    },
    {
      id: 2,
      tag: 'EV-02',
      title: 'MACHINE #92 HARDWARE CIPHER',
      category: 'Digital Cryptography',
      badgeColor: 'text-retrogreen-neon',
      description: 'Raw memory dump from the ROM chip of the cabinet labeled ‘The Reckoning: Origins’. The machine ID was masked behind a 72-bit symmetric key.',
      analysis: 'Binary stream: 01000010 01001100 01010101 01000101 01010011 01001000 01001001 01010010 01010100. Decodes into the plain english word: "BLUESHIRT". This explains why Boiler wore the blue tunic.',
      metadata: 'CRC32: 0x92F1A04B | Status: DECRYPTED',
    },
    {
      id: 3,
      tag: 'EV-03',
      title: 'OCTOBER 23 POWER GRID FLUCTUATION',
      category: 'Telemetry / Grid Data',
      badgeColor: 'text-retroyellow-bright',
      description: 'Telemetry logs from the NuxEland Electricity Department substation feeding 92nd Avenue.',
      analysis: 'A spike of 45,000 Kilowatts occurred over a 400-millisecond window at 01:14 AM. No circuit breaker tripped. The energy did not ground out; it was converted into dimensional resonance and pure photon radiation.',
      metadata: 'Station 14-B | Peak: 45.2 MW | Vector: Ground to Ether',
    },
    {
      id: 4,
      tag: 'EV-04',
      title: 'FLOOR ABRASIONS & FOOTWEAR SKIDMARKS',
      category: 'Forensic Reconstruction',
      badgeColor: 'text-retropink-neon',
      description: 'Violent scuff marks, burn singes, and rubber abrasions etched into the linoleum tiles directly in front of the arcade cabinet.',
      analysis: 'Points of friction confirm three individuals: Boiler, Mega, and Nano. The vectors show all three clawing backwards against an immense forward suction into the CRT tube before Mega and Boiler crossed the event horizon.',
      metadata: 'Tile Grid: 12x4 | Suction Force: > 2400N',
    },
  ];

  const handleSelect = (idx: number) => {
    soundFX.playClick();
    setSelectedItem(idx);
  };

  const handleDecode = () => {
    soundFX.playWarble();
    setDecoded(true);
  };

  const item = evidenceList[selectedItem];

  return (
    <div className="space-y-4 font-mono text-xs text-retropurple-100">
      {/* Evidence Header */}
      <div className="bg-retropurple-900 border border-retropurple-500 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-retropink-neon" />
          <h2 className="text-sm font-pixel text-retropink-neon">
            EVIDENCE.EXE // FORENSIC REPOSITORY
          </h2>
        </div>
        <span className="text-[10px] bg-retropurple-700 px-2 py-0.5 border border-retropurple-300">
          SECURE VAULT: 4 ARTIFACTS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Artifact List */}
        <div className="space-y-2">
          <span className="text-[10px] font-pixel text-retropurple-100 select-none">
            EVIDENCE INDEX:
          </span>
          {evidenceList.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-2.5 bevel-button transition-all flex flex-col gap-1 ${
                selectedItem === idx
                  ? 'bg-retropurple-500 border-retroblue-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]'
                  : 'bg-retropurple-900 hover:bg-retropurple-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-pixel text-[10px] ${ev.badgeColor}`}>
                  [{ev.tag}]
                </span>
                <span className="text-[9px] text-retropurple-100/70">
                  {ev.category}
                </span>
              </div>
              <span className="font-bold text-xs text-white truncate">
                {ev.title}
              </span>
            </button>
          ))}

          {/* Forensic Scanner Tool */}
          <div className="bevel-inset bg-black/40 p-2.5 mt-4 space-y-2">
            <span className="text-[9px] font-pixel text-retroyellow-cream flex items-center gap-1">
              <Cpu className="w-3 h-3 text-retroyellow-pure" /> CIPHER DECODER
            </span>
            <div className="text-[10px] text-retrogreen-neon font-pixel bg-black p-1.5 border border-retrogreen-dark">
              {decoded ? '>>> CIPHER: "BLUESHIRT" [MATCH]' : '>>> [ENCRYPTED HEX STREAM]'}
            </div>
            <button
              onClick={handleDecode}
              className="w-full py-1 text-[10px] font-pixel bg-retroblue-teal hover:bg-retroblue-cyan hover:text-black bevel-button text-white flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> DECODE MACHINE ID
            </button>
          </div>
        </div>

        {/* Right: Detailed Artifact Inspection */}
        <div className="md:col-span-2 bevel-inset bg-black/60 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-retropurple-700 pb-2">
            <div>
              <span className={`font-pixel text-xs ${item.badgeColor}`}>
                {item.tag}: {item.title}
              </span>
              <p className="text-[10px] text-retropurple-100/70">{item.metadata}</p>
            </div>
            <span className="px-2 py-0.5 text-[9px] bg-retropurple-700 text-retropurple-100 border border-retropurple-500 font-pixel">
              VERIFIED
            </span>
          </div>

          {/* Visual Simulation / Forensic Diagram */}
          <div className="relative h-36 bg-retropurple-900/60 border border-retroblue-cyan/40 p-3 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#2994a7_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />

            {selectedItem === 0 && (
              <div className="text-center space-y-2 z-10">
                <div className="inline-block px-4 py-2 bg-retroblue-cyan text-black font-pixel text-xs font-black shadow-[0_0_20px_#00FFFF]">
                  [ BLUE TUNIC + LEATHER GLOVE + SCABBARD ]
                </div>
                <p className="text-[10px] text-retropurple-100 max-w-sm">
                  “Boiler looked down at his bare wrist in panic. His cover was blown the moment Nano noticed the missing wristwatch beneath the glove.”
                </p>
              </div>
            )}

            {selectedItem === 1 && (
              <div className="text-center space-y-2 z-10">
                <div className="font-pixel text-xs text-retrogreen-neon tracking-widest bg-black/80 px-3 py-1.5 border border-retrogreen-neon">
                  01000010 01001100 01010101 01000101 01010011 01001000 01001001 01010010 01010100
                </div>
                <div className="text-xs font-pixel text-retroyellow-pure">
                  DECODED ASCII: “B L U E S H I R T”
                </div>
              </div>
            )}

            {selectedItem === 2 && (
              <div className="w-full flex flex-col items-center justify-center z-10 space-y-2">
                <div className="flex items-end gap-1 h-16 w-3/4 justify-center">
                  <div className="w-3 bg-retroblue-teal h-4" />
                  <div className="w-3 bg-retroblue-teal h-6" />
                  <div className="w-3 bg-retroblue-teal h-5" />
                  <div className="w-4 bg-retropink-neon h-16 animate-pulse shadow-[0_0_15px_#FF00AA]" />
                  <div className="w-3 bg-retroblue-teal h-3" />
                  <div className="w-3 bg-retroblue-teal h-2" />
                </div>
                <span className="font-pixel text-[9px] text-retropink-neon">
                  OCT 23 01:14:22 UTC - CRITICAL VOLTAGE ANOMALY (45.2 MW)
                </span>
              </div>
            )}

            {selectedItem === 3 && (
              <div className="text-center space-y-2 z-10">
                <div className="inline-block px-3 py-1 border border-retropink-neon text-retropink-neon font-pixel text-xs">
                  CRIME SCENE TRAJECTORY: ARCADE CABINET #01
                </div>
                <p className="text-[10px] text-retropurple-100">
                  Resistive traction vectors: Nano (Escaped w/ Abrasions) | Mega & Boiler (Subsumed by Entity Loop)
                </p>
              </div>
            )}
          </div>

          {/* Description & Forensic Analysis */}
          <div className="space-y-2 text-xs">
            <div>
              <span className="font-bold text-white text-[11px]">Description:</span>
              <p className="text-retropurple-100 mt-0.5 leading-relaxed">{item.description}</p>
            </div>
            <div>
              <span className="font-bold text-retroblue-cyan text-[11px]">Forensic Analysis:</span>
              <p className="text-retropink-soft mt-0.5 leading-relaxed">{item.analysis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
