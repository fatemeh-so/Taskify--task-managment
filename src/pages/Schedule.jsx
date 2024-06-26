import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, isValid } from 'date-fns'
import ColumnTodo from '../features/schedule/ColumnTodo'
import ColumnInProgress from '../features/schedule/ColumnInProgress'
// import ColumnCompleted from '../features/schedule/ColumnCompleted'
import ScheduleBar from '../features/schedule/ScheduleBar'
import AddTask from '../features/schedule/AddTask'
import MobileTab from '../features/schedule/MobileTab'
import { CloseAddTask } from '../features/schedule/taskSlice'
import useGetTask from '../features/schedule/useGetTask'
import Spinner from '../components/Spinner'
import ColumnCompleted from '../features/schedule/ColumnCopmleted'
import useGetUser from '../features/auth/useGetUser'

function Schedule() {
  const { close, dateCal, datePickerStatus } = useSelector(
    (store) => store.task
  )
  const dispatch = useDispatch()
  const { data: tasks, isLoading: isTask } = useGetTask()
  
  const {data:user,isLoading}=useGetUser()
 const task=tasks?.filter(task=>task.user_id===user.id)
  const filteredTasks = task?.filter((t) => {
    const taskDate = new Date(t.created_at)
    const selectedDate = new Date(dateCal)
    if (!isValid(taskDate) || !isValid(selectedDate)) {
      return false
    }
    return format(taskDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  })

  const tasksToDisplay = datePickerStatus
    ? filteredTasks?.length > 0
      ? filteredTasks
      : []
    : task

  function openTask() {
    dispatch(CloseAddTask(false))
  }

  if (isTask||isLoading) return <Spinner />

  return (
    <div className='relative z-10 h-[80vh] md:h-[85vh] w-full md:overflow-hidden'>
      {close && <AddTask onClose={openTask} />}
      <div className='w-full h-full'>
        <div className='w-full h-auto'>
          <ScheduleBar />
        </div>

        <div className='hidden md:flex mt-4 w-full h-[90%] flex-col md:flex-row overflow-y-auto md:overflow-hidden'>
          <ColumnTodo task={tasksToDisplay} label='To Do' color='pink1' />
          <ColumnInProgress
            task={tasksToDisplay}
            label='In Progress'
            color='blue1'
          />
          <ColumnCompleted
            task={tasksToDisplay}
            label='Completed'
            color='yellow'
          />
        </div>
        {/* for being responsive in mobile size */}
        <MobileTab />
      </div>
    </div>
  )
}

export default Schedule
