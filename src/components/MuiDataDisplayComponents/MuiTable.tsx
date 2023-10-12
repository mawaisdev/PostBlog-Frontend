import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'

export const MuiTable = () => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
      <Table aria-label='Posts table' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell align='center'>IP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell align='center'>{row.ip_address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const tableData = [
  {
    id: 1,
    first_name: 'Lisette',
    last_name: 'Joiris',
    email: 'ljoiris0@vkontakte.ru',
    gender: 'Female',
    ip_address: '208.178.232.9',
  },
  {
    id: 2,
    first_name: 'Danni',
    last_name: 'Warfield',
    email: 'dwarfield1@goodreads.com',
    gender: 'Female',
    ip_address: '104.15.8.142',
  },
  {
    id: 3,
    first_name: 'Leroi',
    last_name: 'Happs',
    email: 'lhapps2@dion.ne.jp',
    gender: 'Genderfluid',
    ip_address: '164.162.155.89',
  },
  {
    id: 4,
    first_name: 'Clerissa',
    last_name: 'Summerly',
    email: 'csummerly3@zdnet.com',
    gender: 'Female',
    ip_address: '26.83.22.32',
  },
  {
    id: 5,
    first_name: 'Cristionna',
    last_name: 'Aleksandrev',
    email: 'caleksandrev4@51.la',
    gender: 'Female',
    ip_address: '163.110.243.174',
  },
  {
    id: 6,
    first_name: 'Leila',
    last_name: 'Windeatt',
    email: 'lwindeatt5@fastcompany.com',
    gender: 'Non-binary',
    ip_address: '39.200.172.151',
  },
  {
    id: 7,
    first_name: 'Sibylla',
    last_name: 'Randall',
    email: 'srandall6@blogger.com',
    gender: 'Genderqueer',
    ip_address: '243.83.226.137',
  },
  {
    id: 8,
    first_name: 'Yuri',
    last_name: 'Toplis',
    email: 'ytoplis7@alibaba.com',
    gender: 'Male',
    ip_address: '33.112.141.120',
  },
  {
    id: 9,
    first_name: 'Rocky',
    last_name: 'Brickstock',
    email: 'rbrickstock8@fc2.com',
    gender: 'Male',
    ip_address: '152.182.217.62',
  },
  {
    id: 10,
    first_name: 'Thalia',
    last_name: 'Klimas',
    email: 'tklimas9@mozilla.org',
    gender: 'Female',
    ip_address: '97.216.29.218',
  },
]
