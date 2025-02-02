function NotFoundContent() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
			<div className="text-6xl text-red-500 mb-4">
				<span role="img" aria-label="Confused Face">
					😕
				</span>
			</div>
			<h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">404 - Página Não Encontrada</h1>
			<p className="text-lg md:text-xl text-gray-600 text-center max-w-lg">
				Desculpe, a página que você está procurando não existe.
			</p>
		</div>
	);
}
export default NotFoundContent;