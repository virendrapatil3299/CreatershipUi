export default function CreatorCollaborations() {
    return (
      <div className="p-6">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-orange-500">Creator Collaborations</h2>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          View and manage creator–brand partnerships
        </p>
  
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search collab by creator name, or brand name..."
          className="w-full max-w-md px-4 text-black py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
        />
  
        {/* Table Header */}
        <div className="grid grid-cols-2 bg-gradient-to-r from-white to-gray-100 rounded-t-lg px-6 py-3 text-sm font-semibold text-gray-800 border border-b-0">
          <div>CREATOR</div>
          <div>BRANDS</div>
        </div>
  
        {/* Table body goes here */}
        {/* <div className="grid grid-cols-2 px-6 py-4 border-t">...</div> */}
      </div>
    );
  }
  