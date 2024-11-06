export function formatDate(inputDate) {
    if (!inputDate) return '';
    const [year, month, day] = inputDate.split('-').map(Number);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return `${day}${monthNames[month - 1]}${year}`;
}