

export default function Dashboard(){
    return (
        <>
         <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Add your dashboard content here */}
               <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-lg font-semibold mb-4">Welcome!</h2>
                  <p className="text-gray-600">This is your dashboard overview.</p>
              </div>
            </div>
        </div>
        </>
    )
}