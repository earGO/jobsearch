import React from 'react';

function TableSearch() {
	return (
		<SearchInput
			value={searchQuery}
			onSearch={handleSearch}
			placeholder="Поиск по справочнику"
		/>
	);
}
