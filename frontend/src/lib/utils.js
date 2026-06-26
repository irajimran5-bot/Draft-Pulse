export function formatDate(date){
    const parsedDate = new Date(date);
    
    return date.toLocaleDateString("en-US",{
        month:"short",
        day:"numeric",
        year:"numeric",
    });

}