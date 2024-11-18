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

export const countOccurrences = async (seq_id: number, part: number) => {
    const connection = StarRocksInstance.getInstance();
    const sql = 'SELECT count(1) as c FROM `occurrences_wgs5_part` WHERE `seq_id` = ? and `part`= ?';
    const values = [ seq_id.toString(), part.toString() ];

    const [rows, _fields] = await connection.execute(sql, values);
    // console.log(rows);
};
export const listOccurrences = async(seq_id: number, part: number) => {
    const connection = StarRocksInstance.getInstance();
    console.log('before' + seq_id)
    const sql = `
    SELECT o.seq_id,
             o.locus_id,o.filter,o.zygosity,o.quality,v.pf,v.af, v.gnomad_v3_af,v.hgvsg,v.omim_inheritance_code,o.ad_ratio,
             o.variant_class,v.vep_impact,v.symbol,v.clinvar_interpretation,v.mane_select,v.canonical
            from occurrences_wgs5_part o, variants5 v
            where o.locus_id in (
              select o.locus_id from occurrences_wgs5_part o
              join variants5 v on v.locus_id=o.locus_id
              where pf < 0.1
              and seq_id=:seq_id and o.part=:part
              order by pf desc, locus_id asc
              limit 100
            )
            and v.locus_id=o.locus_id and o.seq_id=:seq_id and o.part=:part`;
    const values = { seq_id: seq_id.toString(), part: part.toString() };

    const [rows, _fields] = await connection.execute(sql, values);

    console.log(rows);
};
