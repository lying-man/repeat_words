import React, { memo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useMediaQuery } from '@mui/material';
import { getStatisticData } from '../../../../utils/getStatisticData';

const dataCellStyles = {
    "failure": { backgroundColor: "#BDC3C7" },
    "success": { backgroundColor: "#2ECC71", color: "#fff" },
    "normal": {}
};

const StatisticDetail = memo(({ list, currentDate }) => {

    const statData = getStatisticData(list, currentDate);

    const getCellStyles = (type, mode) => {

        let padding = matchPadding ? "0px" : "";

        if (mode === "caption") {
            return { p: padding };
        } else {
            let initStyles = dataCellStyles[type];
            return { ...initStyles, p: padding };
        }

    } 

    function createData(monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
        return { monday, tuesday, wednesday, thursday, friday, saturday, sunday };
    }

    const rows = statData.map(el => createData(...el));

    const match = useMediaQuery('(max-width:800px)');
    const matchPadding = useMediaQuery('(max-width:502px)');

    return (
        <TableContainer component={Paper}>
            <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell sx={getCellStyles("", "caption")} align="center">{ match ? "ПН" : "Понедельник" }</TableCell>
                    <TableCell sx={getCellStyles("", "caption")} align="center">{ match ? "ВТ" : "Вторник" }</TableCell>
                    <TableCell sx={getCellStyles("", "caption")} align="center">{ match ? "СР" : "Среда" }</TableCell>
                    <TableCell sx={getCellStyles("", "caption")} align="center">{ match ? "ЧТ" : "Четверг" }</TableCell>
                    <TableCell sx={getCellStyles("", "caption")} align="center">{ match ? "ПТ" : "Пятница" }</TableCell>
                    <TableCell sx={getCellStyles("", "caption")} align="center">{ match ? "СБ" : "Суббота" }</TableCell>
                    <TableCell sx={getCellStyles("", "caption")} align="center">{ match ? "ВС" : "Воскресение" }</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row" align="center" sx={getCellStyles(row.monday.type)}>{row.monday.value}</TableCell>
                    <TableCell align="center" sx={getCellStyles(row.tuesday.type, "cell")}>{row.tuesday.value}</TableCell>
                    <TableCell align="center" sx={getCellStyles(row.wednesday.type, "cell")}>{row.wednesday.value}</TableCell>
                    <TableCell align="center" sx={getCellStyles(row.thursday.type, "cell")}>{row.thursday.value}</TableCell>
                    <TableCell align="center" sx={getCellStyles(row.friday.type, "cell")}>{row.friday.value}</TableCell>
                    <TableCell align="center" sx={getCellStyles(row.saturday.type, "cell")}>{row.saturday.value}</TableCell>
                    <TableCell align="center" sx={getCellStyles(row.sunday.type, "cell")}>{row.sunday.value}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
});

export default StatisticDetail;