import { Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

export class TableData<T extends object, U extends object> {
  constructor(
    readonly data: T[] = [],
    readonly actions: U[] = []
  ) { }
}

type ListProps<T extends object, U extends object> = {
  tableData: TableData<T, U>
  loading: boolean
  tableHeaders: string[]
  requestWasMade: boolean
  notFoundMsg: string
}

export function List<T extends object, U extends object>({
  loading,
  tableData,
  requestWasMade,
  tableHeaders,
  notFoundMsg
}: ListProps<T, U>) {
  return (
    <>
      {loading ? (
        <Skeleton
          variant="rounded"
          height={500}
          width='100%'
        />
      ) : (
        <>
          {(tableData.data.length <= 0 && requestWasMade) && (
            <Typography>{notFoundMsg}</Typography>
          )}

          {tableData.data.length > 0 && (
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
                {tableData.data.map((obj, idx) =>
                  <TableRow key={idx}>
                    {Object.keys(obj).map(key =>
                      <TableCell align='center' key={key}>
                        {Object.getOwnPropertyDescriptor(obj, key)?.value || 'Dado não encontrado'}
                      </TableCell>
                    )}
                    {Object.keys(tableData.actions[idx]).map(key =>
                      <TableCell align='center' key={key}>
                        {Object.getOwnPropertyDescriptor(tableData.actions[idx], key)?.value || 'Dado não encontrado'}
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