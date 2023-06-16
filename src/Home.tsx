/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { List, TableData } from "./List";
import ShowIcon from '@mui/icons-material/AutoAwesome';

type User = {
  age: number
  id: number
  name: string
  gender: string
}

type Action = {
  showAlert: JSX.Element
}

export function Home() {

  const [tableData, setTableData] = useState<TableData<User, Action>>(new TableData())

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
        setTableData(new TableData())
        return
      }

      const data: User[] = users.map((user: any) => {
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          gender: user.gender,
          age: user.age,
        }
      })

      const actions: Action[] = data.map(user => {
        return {
          showAlert:
            <IconButton onClick={() => alert(`User name: ${user.name}`)}>
              <ShowIcon />
            </IconButton>
        }
      })

      setTableData({
        data,
        actions
      })

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
        tableData={tableData}
        loading={loading}
        notFoundMsg="No users found ☹️"
        tableHeaders={tableHeaders}
        requestWasMade={requestWasMade}
      />
    </Box>
  )
}
