function benchmark(fn: () => any, description: string, iterations = 1) {
	setTimeout(() => {
		const execTimes: number[] = [];
		var result;
		while (iterations--) {
			// const start = process.hrtime()[1];
			const start = Date.now();
			result = fn();
			const end = Date.now();
			//const end = process.hrtime()[1];
			execTimes.push(end - start);
		}

		const min = execTimes.reduce((pre, cur) => (pre < cur ? pre : cur), execTimes[0]);
		const max = execTimes.reduce((pre, cur) => (pre > cur ? pre : cur), execTimes[0]);
		const mean = execTimes.reduce((pre, cur) => pre + cur, 0) / execTimes.length;

		console.log(description, '', 'min ' + min + ',', 'max ' + max + ',', 'avg ' + mean);
	});
}
