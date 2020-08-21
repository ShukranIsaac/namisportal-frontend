/**
 * Sorting user data structures
 * 
 * @author Isaac S. Mwakabira
 */
export const algorithms = (() => {

    const desc = (a, b, orderBy) => {

        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }

        return 0;
    }
    
    const stableSort = (array, cmp) => {

        const stabilizedThis = array.map((el, index) => [el, index]);

        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });

        return stabilizedThis.map(el => el[0]);
    }
    
    const sort = (order, orderBy) => {

        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);

    }

    const capitalize = (character) => {
        return character && character[0].toUpperCase() + character.slice(1);
    }

    return {
        desc, 
        sort, 
        stableSort,
        capitalize
    }

})();