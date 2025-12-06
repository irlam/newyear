// Main page for New Year's Trip planning website
// Displays all sections: timetable, rooms, activities, and shopping lists
'use client';

import EditableSection from '@/components/EditableSection';
import EditableList from '@/components/EditableList';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold neon-heading mb-4">
            NEW YEAR&apos;S TRIP
          </h1>
          <p className="text-neon-green text-lg">Plan together for an amazing celebration</p>
        </header>

        {/* Timetable Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neon-blue mb-6">Timetable (Meals)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tuesday 30th */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Tuesday 30th</h3>
              <EditableSection sectionKey="timetable-breakfast-tue30" title="Breakfast" />
              <EditableSection sectionKey="timetable-dinner-tue30" title="Dinner" />
              <EditableSection sectionKey="timetable-tea-tue30" title="Tea" />
              <EditableSection sectionKey="timetable-supper-tue30" title="Supper" />
            </div>

            {/* Wednesday 31st */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Wednesday 31st</h3>
              <EditableSection sectionKey="timetable-breakfast-wed31" title="Breakfast" />
              <EditableSection sectionKey="timetable-dinner-wed31" title="Dinner" />
              <EditableSection sectionKey="timetable-tea-wed31" title="Tea" />
              <EditableSection sectionKey="timetable-supper-wed31" title="Supper" />
            </div>

            {/* Thursday 1st */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Thursday 1st</h3>
              <EditableSection sectionKey="timetable-breakfast-thu1" title="Breakfast" />
              <EditableSection sectionKey="timetable-dinner-thu1" title="Dinner" />
              <EditableSection sectionKey="timetable-tea-thu1" title="Tea" />
              <EditableSection sectionKey="timetable-supper-thu1" title="Supper" />
            </div>

            {/* Friday 2nd */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Friday 2nd</h3>
              <EditableSection sectionKey="timetable-breakfast-fri2" title="Breakfast" />
              <EditableSection sectionKey="timetable-dinner-fri2" title="Dinner" />
              <EditableSection sectionKey="timetable-tea-fri2" title="Tea" />
              <EditableSection sectionKey="timetable-supper-fri2" title="Supper" />
            </div>
          </div>
        </section>

        {/* Guest Rooms Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neon-blue mb-6">Guest Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableSection 
              sectionKey="room-1" 
              title="Bedroom 1 (downstairs): 2 single beds & ensuite" 
              placeholder="Room notes and who's staying..."
            />
            <EditableSection 
              sectionKey="room-2" 
              title="Bedroom 2 (downstairs): 2 single beds & ensuite" 
              placeholder="Room notes and who's staying..."
            />
            <EditableSection 
              sectionKey="room-3" 
              title="Bedroom 3 (downstairs): 3 single beds" 
              placeholder="Room notes and who's staying..."
            />
            <EditableSection 
              sectionKey="room-4" 
              title="Bedroom 4 (upstairs): double bed and bunk beds (bathroom on corridor)" 
              placeholder="Room notes and who's staying..."
            />
            <EditableSection 
              sectionKey="room-5" 
              title="Bedroom 5 (upstairs): single and double beds & ensuite" 
              placeholder="Room notes and who's staying..."
            />
            <EditableSection 
              sectionKey="room-6" 
              title="Bedroom 6 (upstairs): 2 single beds (bathroom on corridor)" 
              placeholder="Room notes and who's staying..."
            />
            <EditableSection 
              sectionKey="room-7" 
              title="Bedroom 7" 
              placeholder="Room notes and who's staying..."
            />
            <EditableSection 
              sectionKey="room-8" 
              title="Bedroom 8" 
              placeholder="Room notes and who's staying..."
            />
          </div>
        </section>

        {/* Games & Activities Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neon-blue mb-6">Games & Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tuesday 30th */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Tuesday 30th</h3>
              <EditableSection sectionKey="activities-morning-tue30" title="Morning" />
              <EditableSection sectionKey="activities-afternoon-tue30" title="Afternoon" />
              <EditableSection sectionKey="activities-evening-tue30" title="Evening" />
            </div>

            {/* Wednesday 31st (New Year's Eve) */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Wednesday 31st (NEW YEAR&apos;S EVE)</h3>
              <EditableSection sectionKey="activities-morning-wed31" title="Morning" />
              <EditableSection sectionKey="activities-afternoon-wed31" title="Afternoon" />
              <EditableSection sectionKey="activities-evening-wed31" title="Evening" />
            </div>

            {/* Thursday 1st (New Year's Day) */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Thursday 1st (NEW YEAR&apos;S DAY)</h3>
              <EditableSection sectionKey="activities-morning-thu1" title="Morning" />
              <EditableSection sectionKey="activities-afternoon-thu1" title="Afternoon" />
              <EditableSection sectionKey="activities-evening-thu1" title="Evening" />
            </div>

            {/* Friday 2nd */}
            <div>
              <h3 className="text-2xl font-semibold text-neon-yellow mb-4">Friday 2nd</h3>
              <EditableSection sectionKey="activities-morning-fri2" title="Morning" />
              <EditableSection sectionKey="activities-afternoon-fri2" title="Afternoon" />
              <EditableSection sectionKey="activities-evening-fri2" title="Evening" />
            </div>
          </div>
        </section>

        {/* Shopping Lists Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neon-blue mb-6">Shopping Lists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableList 
              listKey="shopping-day1" 
              title="Day 1 Shopping List" 
              placeholder="Enter item..."
            />
            <EditableList 
              listKey="shopping-general" 
              title="General Shopping List" 
              placeholder="Enter item..."
            />
          </div>
        </section>

        {/* Equipment Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neon-blue mb-6">Items/Equipment People Will Bring</h2>
          <EditableList 
            listKey="equipment" 
            title="Tables, Chairs, Equipment, etc." 
            placeholder="e.g., Folding table, 4 chairs..."
          />
        </section>
      </div>
    </main>
  );
}
