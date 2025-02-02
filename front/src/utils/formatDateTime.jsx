export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    const optionsCurrentYear = { day: '2-digit', month: '2-digit' };
    const optionsOtherYears = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return year === currentYear
        ? date.toLocaleDateString('pt-BR', optionsCurrentYear)
        : date.toLocaleDateString('pt-BR', optionsOtherYears);
};

export const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('pt-BR', options);
};