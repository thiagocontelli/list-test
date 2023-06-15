/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { List } from "./List";
import ShowIcon from '@mui/icons-material/AutoAwesome';

type User = {
  id: number
  name: string
  gender: string
  age: number
  showAlert: JSX.Element
}

export function Home() {
  
  const [users, setUsers] = useState<User[]>([])

  const [requestWasMade, setRequestWasMade] = useState(false)

  const [loading, setLoading] = useState(false)

  const randomBoolean = () => Math.random() >= 0.7;

  const getUsers = async () => {
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const res = await fetch('https://dummyjson.com/users?limit=5')

      const { users } = await res.json()

      if (randomBoolean()) {
        setUsers([])
        return
      } 
      
      setUsers(users.map((user: any) => {
        return { 
          name: `${user.firstName} ${user.lastName}`,
          age: user.age,
          gender: user.gender,
          id: user.id,
          showAlert: 
            <IconButton onClick={() => alert('Showing alert!')}>
              <ShowIcon />
            </IconButton>
        } as User
      }))

      setRequestWasMade(true)
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const tableHeaders = ['#', 'Name', 'Gender', 'Age', 'Show Alert']

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='3rem'>
      <Button variant='contained' onClick={getUsers}>Fetch users</Button>

      <List
        arr={users}
        keys={['id', 'name', 'gender', 'age', 'showAlert']}
        loading={loading}
        notFoundMsg="No users found ☹️"
        tableHeaders={tableHeaders}
        requestWasMade={requestWasMade}
      />
    </Box>
  )
}
