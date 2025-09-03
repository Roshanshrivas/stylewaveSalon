import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage your salon's operations.</p>
            {/* Summary Cards / Statistics Widgets (Top section) */}
             <div className='flex flex-wrap gap-4 mt-6'>
                {/* Additional dashboard content can go here */}
                <div className='mt-4 w-[300px] h-[140px] bg-gray-200 rounded-lg shadow-md p-4'>
                   Total Users 
                </div>
                <div className='mt-4 w-[300px] h-[140px] bg-gray-200 rounded-lg shadow-md p-4'>
                   Total Orders 
                </div>
                <div className='mt-4 w-[300px] h-[140px] bg-gray-200 rounded-lg shadow-md p-4'>
                   Total Revenue 
                </div>
                <div className='mt-4 w-[300px] h-[140px] bg-gray-200 rounded-lg shadow-md p-4'>
                   Pending Orders 
                </div>
                <div className='mt-4 w-[300px] h-[140px] bg-gray-200 rounded-lg shadow-md p-4'>
                   Delivered Orders 
                </div>
                <div className='mt-4 w-[300px] h-[140px] bg-gray-200 rounded-lg shadow-md p-4'>
                   This Week’s Sales 
                </div>
             </div>
            {/* Charts & Graphs Monthly Revenue Chart||Orders per Month||Daily/Weekly Order Trend */}
            <div>
                <h2 className="text-xl font-semibold mt-8">Monthly Revenue Chart</h2>
                <p className="text-gray-600">Visualize your salon's revenue trends over the past months.</p>
                {/* Placeholder for chart */}
                <div className='mt-4 w-full h-[300px] bg-gray-300 rounded-lg shadow-md p-4'>
                   Monthly Revenue Chart
                </div>
            </div>
             {/* ======== Recent Orders || Top-Selling ========== */}
            <div className='mt-8 flex w-full gap-4'>
            {/* Recent Orders Table A table showing latest orders with:
            Order ID, Customer Name, Amount, Status (Pending, Delivered, Canceled), Date */}
            <div className='mt-8 w-1/2'>
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <p className="text-gray-600">View the latest orders placed by customers.</p>
                {/* Placeholder for table */}
                <div className='mt-4 w-full bg-white rounded-lg shadow-md p-4'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b'>
                                <th className='py-2 text-left'>Order ID</th>
                                <th className='py-2 text-left'>Customer Name</th>
                                <th className='py-2 text-left'>Amount</th>
                                <th className='py-2 text-left'>Status</th>
                                <th className='py-2 text-left'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sample data row */}
                            <tr className='border-b'>
                                <td className='py-2'>#12345</td>
                                <td className='py-2'>John Doe</td>
                                <td className='py-2'>$50.00</td>
                                <td className='py-2 text-green-600'>Delivered</td>
                                <td className='py-2'>2023-10-01</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='py-2'>#12345</td>
                                <td className='py-2'>John Doe</td>
                                <td className='py-2'>$50.00</td>
                                <td className='py-2 text-green-600'>Delivered</td>
                                <td className='py-2'>2023-10-01</td>
                            </tr>
                        </tbody>
                    </table>
              </div>
          </div>
           {/* Top-Selling Services / Products */}
            <div className='mt-8 w-1/2'>
                <h2 className="text-xl font-semibold">Top-Selling Services</h2>
                <p className="text-gray-600">Highlight the most popular services or products.</p>
                {/* Placeholder for top-selling services */}
                <div className='mt-4 w-full bg-white rounded-lg shadow-md p-4'>
                    <ul>
                        <li className='py-2 border-b'>Haircut - 50 Sales</li>
                        <li className='py-2 border-b'>Manicure - 30 Sales</li>
                        <li className='py-2 border-b'>Pedicure - 25 Sales</li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Dashboard