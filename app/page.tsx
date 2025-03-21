'use client';

import { useState } from 'react';
import BracketView from '@/components/bracket-view';
import GameSchedule from '@/components/game-schedule';
import BettingOddsView from '@/components/betting-odds';

export default function Home() {
  const [activeTab, setActiveTab] = useState('bracket');

  return (
    <main className="min-h-screen bracket-bg">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-2 text-primary bracket-title">2025 NCAA TOURNAMENT</h1>
        <h2 className="text-2xl text-center mb-8 text-gray-700 bracket-title">BRACKET TRACKER</h2>
        
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('bracket')}
            className={`px-6 py-3 rounded-lg bracket-title text-lg ${
              activeTab === 'bracket'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            BRACKET
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-3 rounded-lg bracket-title text-lg ${
              activeTab === 'schedule'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            GAME SCHEDULE
          </button>
          <button
            onClick={() => setActiveTab('odds')}
            className={`px-6 py-3 rounded-lg bracket-title text-lg ${
              activeTab === 'odds'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
            }`}
          >
            BETTING ODDS
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'bracket' && <BracketView />}
          {activeTab === 'schedule' && <GameSchedule />}
          {activeTab === 'odds' && <BettingOddsView />}
        </div>
      </div>
    </main>
  );
}

