export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export const formatDate = (date: Date) => {
	const year = date.getFullYear();
	const month = date.toLocaleString("en-US", { month: "long" });

	return `${month} ${year}`;
}
