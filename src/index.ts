import { countOccurrences, fetchSeqExp } from './benchmark';
import { concurrentUsers } from './env';
import { takeRandomElemOfArray } from './utils';

const main = async () => {
    console.time('fetchSeqExp');
    const seqExp = await fetchSeqExp();
    console.timeEnd('fetchSeqExp');

    const concurrentUsersSeqExp = [];

    while (concurrentUsersSeqExp.length < concurrentUsers) {
        concurrentUsersSeqExp.push(takeRandomElemOfArray(seqExp));
    }

    console.log('concurrentSeqExp', concurrentUsersSeqExp);

    for (const user of concurrentUsersSeqExp) {
        await countOccurrences(user.seq_id);
    }
};

main()
    .then(() => {
        console.log('Finished');
    })
    .catch((err) => {
        console.error(err);
    });
