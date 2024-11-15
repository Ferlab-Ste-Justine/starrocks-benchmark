import { RowDataPacket } from 'mysql2/promise';

import StarRocksInstance from './connection';

interface SeqExpResult extends RowDataPacket {
    seq_id: number;
    part: number;
}

export const fetchSeqExp = async (): Promise<SeqExpResult[]> => {
    const connection = StarRocksInstance.getInstance();
    const sql = 'SELECT seq_id, part FROM `sequencing_experiment` WHERE `study_id` <> :sid';
    const values = { sid: 'BACQ' };

    const [rows, _fields] = await connection.execute<SeqExpResult[]>(sql, values);

    return rows;
};

export const countOccurrences = async (seqId: number) => {
    const connection = StarRocksInstance.getInstance();
    const sql = 'SELECT count(1) FROM `snv` WHERE `seq_id` = :seqId';
    const values = { seqId };

    const [rows, _fields] = await connection.execute(sql, values);

    console.log(rows);
};
