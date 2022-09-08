export const disableClickEvent = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
  e.stopPropagation();
};
