import React, { useState } from "react";
import { FiSettings, FiEye, FiCode, FiMaximize2 } from "react-icons/fi";
import ReactAtropos from "./ReactAtropos";

const DemoSection = () => {
  const [settings, setSettings] = useState({
    rotateXMax: 20,
    rotateYMax: 20,
    activeOffset: 40,
    shadowScale: 1.05,
    highlight: true,
    shadow: true,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const demoTiles = [
    { id: 1, title: "Card 1", color: "from-cyan-500 to-blue-500", rotation: 5 },
    {
      id: 2,
      title: "Card 2",
      color: "from-purple-500 to-pink-500",
      rotation: -5,
    },
    {
      id: 3,
      title: "Card 3",
      color: "from-orange-500 to-yellow-500",
      rotation: 8,
    },
    {
      id: 4,
      title: "Card 4",
      color: "from-green-500 to-emerald-500",
      rotation: -8,
    },
  ];

  return (
    <section
      id="demo"
      className="section-padding bg-gradient-to-t from-gray-900/50 to-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Interactive Demo</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Adjust settings and see how the 3D tilt effects work in real-time.
            Hover over the cards to see the effect!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Demo Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {demoTiles.map((tile) => (
              <ReactAtropos
                key={tile.id}
                className="aspect-square"
                rotateXMax={settings.rotateXMax}
                rotateYMax={settings.rotateYMax}
                shadowScale={settings.shadowScale}
                highlight={settings.highlight}
                shadow={settings.shadow}
              >
                <div
                  className={`h-full rounded-2xl bg-gradient-to-br ${tile.color} p-0.5`}
                >
                  <div className="h-full rounded-xl bg-gray-900/90 flex flex-col items-center justify-center p-4 md:p-6">
                    <div className="text-3xl md:text-4xl mb-2 md:mb-4">✨</div>
                    <h3 className="text-lg md:text-xl font-bold text-center mb-1 md:mb-2">
                      {tile.title}
                    </h3>
                    <p className="text-gray-400 text-center text-xs md:text-sm">
                      Hover or touch me!
                    </p>
                  </div>
                </div>
              </ReactAtropos>
            ))}
          </div>

          {/* Controls Panel */}
          <div className="p-6 md:p-8 rounded-2xl glass-effect">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <FiSettings className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              <h3 className="text-xl md:text-2xl font-bold">
                Atropos Settings
              </h3>
            </div>

            {/* Settings Controls */}
            <div className="space-y-6 md:space-y-8">
              {/* Rotation Settings */}
              <div>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <label className="text-gray-300 text-sm md:text-base">
                    Rotation X Max: {settings.rotateXMax}°
                  </label>
                  <span className="text-cyan-400 text-sm md:text-base">
                    {settings.rotateXMax}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={settings.rotateXMax}
                  onChange={(e) =>
                    updateSetting("rotateXMax", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <label className="text-gray-300 text-sm md:text-base">
                    Rotation Y Max: {settings.rotateYMax}°
                  </label>
                  <span className="text-cyan-400 text-sm md:text-base">
                    {settings.rotateYMax}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={settings.rotateYMax}
                  onChange={(e) =>
                    updateSetting("rotateYMax", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <label className="text-gray-300 text-sm md:text-base">
                    Active Offset: {settings.activeOffset}px
                  </label>
                  <span className="text-cyan-400 text-sm md:text-base">
                    {settings.activeOffset}px
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={settings.activeOffset}
                  onChange={(e) =>
                    updateSetting("activeOffset", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>

              {/* Toggle Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiEye className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                    <span className="text-gray-300 text-sm md:text-base">
                      Highlight Effect
                    </span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.highlight}
                      onChange={(e) =>
                        updateSetting("highlight", e.target.checked)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiMaximize2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    <span className="text-gray-300 text-sm md:text-base">
                      Shadow Effect
                    </span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.shadow}
                      onChange={(e) =>
                        updateSetting("shadow", e.target.checked)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() =>
                  setSettings({
                    rotateXMax: 20,
                    rotateYMax: 20,
                    activeOffset: 40,
                    shadowScale: 1.05,
                    highlight: true,
                    shadow: true,
                  })
                }
                className="w-full py-2 md:py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg font-semibold transition-all"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: none;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #475569;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
        }

        input:checked + .slider {
          background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </section>
  );
};

export default DemoSection;
