import { countOccurrences, fetchSeqExp } from './benchmark';
import connection from './connection';
import { concurrentUsers } from './env';
import { takeRandomElemOfArray } from './utils';

const main = async () => {
    console.time('fetchSeqExp');
    const seqExp = await fetchSeqExp();

    const concurrentUsersSeqExp = [];

    while (concurrentUsersSeqExp.length < concurrentUsers) {
        concurrentUsersSeqExp.push(takeRandomElemOfArray(seqExp));
    }

    console.log('concurrentSeqExp', concurrentUsersSeqExp);

    const workerPromises = [];
    for (const seqExp of concurrentUsersSeqExp) {
        workerPromises.push(countOccurrences(seqExp.seq_id, seqExp.part));
        // workerPromises.push( listOccurrences(seqExp.seq_id, seqExp.part).catch((err) => {
        //     console.error(err);
        // }));
    }
    await Promise.all(workerPromises);
    console.timeEnd('fetchSeqExp');
    await connection.getInstance().end();
};

main()
    .then(() => {
        console.log('Finished');
    })
    .catch((err) => {
        console.error(err);
    });
