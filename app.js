const { Worker } = require('worker_threads');
const { fork } = require('child_process')
const {performance, PerformanceObserver} = require('perf_hooks')

const performanceObserver = new PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	})
})
performanceObserver.observe({entryTypes:['measure']})

const worckerFunction = (array) => {
	performance.mark('worcker start')

	return new Promise((resolve, reject) => {
		const worker = new Worker('./worker.js', {
			workerData: {
				array
			}
		})

		worker.on('message', (msg) => {
			resolve(msg)
		})
	})
}

const forkFunction = (array) => {
	performance.mark('fork start')

	return new Promise((resolve, reject) => {
		const forkProcess = fork('fork.js')
		forkProcess.on('message', (msg) => {
			resolve(msg)
		})
		forkProcess.send({array})
	})
}

const main = async () => {
	await worckerFunction([29, 19, 48, 30]).then(() => {
		performance.mark('worcker end');
		performance.measure('worcker', 'worcker start', 'worcker end');
	})
	await forkFunction([29, 19, 48, 30]).then(() => {
		performance.mark('fork end');
		performance.measure('fork', 'fork start', 'fork end');
	})
}

main()