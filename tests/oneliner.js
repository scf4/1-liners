import { equal } from 'assert';
import { join } from 'path';
import getModules from 'get-modules';
import { readdir, readFile } from 'fs';

test('Should be a oneliner', (done) =>
	getModules(join(__dirname, '..'), (err, modules) => {
		if (err) throw err;
		let countTests = 0;

		modules.forEach((file) => {
			if (file === 'index.js') { return }

			readFile(join(__dirname, '..', 'module', file), { encoding: 'utf8', flag: 'r' }, (err, data) => {
				if (err) throw err;
				let count = 0;
				let lines = data.split(/\n/).forEach((l) => {
					if (l.startsWith(' *') || l.startsWith('/')) return;
					if (l.length > 0) count++;
				});

				equal(count, 1, `${file} should be a oneliner`);

				countTests++;
				if (countTests >= modules.length -1 ) done();
			})
		});
	})
);
