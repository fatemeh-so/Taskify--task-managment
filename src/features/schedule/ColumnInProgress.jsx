/* eslint-disable react/prop-types */
// Column.js
import SquareRow from './SquareRow'


function ColumnInProgress({ label, color,task }) {

  // Check if task and task.status are defined before calling toString
  const InProgressTask =
    task?.filter((task) => task?.status?.toString() === 'In Progress') || []


  const bgColorClass =
    {
      pink1: 'bg-pink-100',
      blue1: 'bg-blue-100',
      yellow: 'bg-yellow-100',
    }[color] || 'bg-gray-100' // default to gray if color is not found

  return (
    <div
      className={`flex flex-col flex-1 p-4 rounded overflow-y-auto  `}
      style={{ maxHeight: '100%' }}
    >
      <div className='flex justify-center items-center'>
        <div
          className={`text-center hidden md:block w-full rounded-[.4rem] pt-2 h-[2.5rem] font-bold mb-4 ${bgColorClass}`}
          >
          {label}
        </div>
      </div>
      <div className=' overflow-y-auto h-[100%] w-[100%] '>
        {InProgressTask.map((task) => {
          return <SquareRow key={task.id} task={task} />
        })}
      </div>
    </div>
  )
}

export default ColumnInProgress
