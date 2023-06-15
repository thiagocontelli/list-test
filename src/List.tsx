import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

type ListProps<T> = {
  arr: T[]
  keys: string[]
  loading: boolean
  tableHeaders: string[]
  requestWasMade: boolean
  notFoundMsg: string
}

export function List<T>({
  loading,
  arr,
  requestWasMade,
  tableHeaders,
  keys,
  notFoundMsg
}: ListProps<T>) {
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {(arr.length <= 0 && requestWasMade) && (
            <Typography>{notFoundMsg}</Typography>
          )}

          {arr.length > 0 && (
            <Table component={Paper}>
              <TableHead>
                <TableRow>
                  {tableHeaders.map(item =>
                    <TableCell
                      align='center'
                      sx={{ fontWeight: 'bold' }}
                      key={item}
                    >
                      {item}
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {arr.map((obj, idx) =>
                  <TableRow key={idx}>
                    {keys.map(key =>
                      <TableCell align='center' key={key}>
                        {Object.getOwnPropertyDescriptor(obj, key)?.value}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  )
}