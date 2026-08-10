# -*- coding: utf-8 -*-
"""Trich xuat du lieu tu sql_java_core_review_checklist_v1_1.xlsx ra data/*.js.

Chay lai script nay moi khi file Excel thay doi:
    python tools/extract_xlsx.py
Chi dung stdlib (zipfile + ElementTree) vi may khong co openpyxl.
"""
import json
import os
import re
import zipfile
from xml.etree import ElementTree as ET

NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
T = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t'

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XLSX = os.path.join(BASE, 'sql_java_core_review_checklist_v1_1.xlsx')
OUT = os.path.join(BASE, 'data')

# sheet xml -> ten chu de hien thi tren web
QA_SHEETS = [
    ('sheet8.xml', 'Java Core'),
    ('sheet5.xml', 'Java Spring'),
    ('sheet6.xml', 'SQL'),
    ('sheet7.xml', 'Git'),
    ('sheet9.xml', 'JavaScript (FE)'),
    ('sheet3.xml', 'Angular'),
    ('sheet4.xml', 'C#'),
]
CHECKLIST_SHEETS = [
    ('sheet1.xml', 'SQL'),
    ('sheet2.xml', 'Java'),
]


def col_index(ref):
    """'B12' -> 1 (0-based column index)."""
    letters = re.match(r'[A-Z]+', ref).group(0)
    idx = 0
    for ch in letters:
        idx = idx * 26 + (ord(ch) - 64)
    return idx - 1


def load_shared_strings(z):
    try:
        root = ET.fromstring(z.read('xl/sharedStrings.xml'))
    except KeyError:
        return []
    return [''.join(t.text or '' for t in si.iter(T)) for si in root]


def read_rows(z, sheet, ss):
    """Tra ve list cac row, moi row la list gia tri theo dung vi tri cot."""
    root = ET.fromstring(z.read('xl/worksheets/' + sheet))
    out = []
    for row in root.find('m:sheetData', NS):
        vals = {}
        for c in row:
            v = c.find('m:v', NS)
            if v is None:
                is_el = c.find('m:is', NS)
                txt = ''.join(t.text or '' for t in is_el.iter(T)) if is_el is not None else ''
            elif c.get('t') == 's':
                txt = ss[int(v.text)]
            else:
                txt = v.text or ''
            if txt and txt.strip():
                vals[col_index(c.get('r'))] = txt.strip()
        width = max(vals) + 1 if vals else 0
        out.append([vals.get(i, '') for i in range(width)])
    return out


def extract_theory(z, ss):
    topics = []
    for sheet, topic in QA_SHEETS:
        items = []
        rows = read_rows(z, sheet, ss)
        for i, row in enumerate(rows):
            if not row or not row[0]:
                continue
            q = row[0]
            # bo dong header
            if q.lower() in ('objective', 'no.') or q.startswith('<<'):
                continue
            answer = row[1] if len(row) > 1 else ''
            examples = [c for c in row[2:] if c]
            if not answer and not examples:
                continue
            items.append({
                'id': '%s-%d' % (topic, i),
                'question': q,
                'answer': answer,
                'examples': examples,
                'source': 'excel',
            })
        topics.append({'topic': topic, 'items': items})
    return topics


def extract_checklist(z, ss):
    sections = []
    for sheet, section in CHECKLIST_SHEETS:
        rows = read_rows(z, sheet, ss)
        header = None
        col = {}
        items = []
        topic = ''
        for row in rows:
            if header is None:
                if 'NO.' in row:
                    header = row
                    for j, h in enumerate(row):
                        if h.strip():
                            col[h.strip().lower()] = j
                continue
            def get(name):
                j = col.get(name)
                return row[j] if j is not None and j < len(row) else ''
            no = get('no.')
            question = get('question')
            if not question:
                continue
            if get('topic'):
                topic = get('topic')
            priority = get('priority') or get('severity')
            items.append({
                'id': no or '%s-%d' % (section, len(items)),
                'topic': topic,
                'type': get('type'),
                'question': question,
                'priority': priority,
            })
        sections.append({'section': section, 'items': items})
    return sections


def write_js(filename, varname, data, comment):
    path = os.path.join(OUT, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write('// %s\n// File nay duoc sinh tu dong boi tools/extract_xlsx.py - dung sua tay.\n' % comment)
        f.write('window.%s = %s;\n' % (varname, json.dumps(data, ensure_ascii=False, indent=1)))
    return path


def main():
    os.makedirs(OUT, exist_ok=True)
    z = zipfile.ZipFile(XLSX)
    ss = load_shared_strings(z)

    theory = extract_theory(z, ss)
    checklist = extract_checklist(z, ss)

    write_js('theory-data.js', 'THEORY_DATA', theory, 'Q&A ly thuyet trich tu Excel')
    write_js('checklist-data.js', 'CHECKLIST_DATA', checklist, 'Checklist SQL/Java trich tu Excel')

    for t in theory:
        print('QA  %-16s %3d cau' % (t['topic'], len(t['items'])))
    for s in checklist:
        print('CL  %-16s %3d cau' % (s['section'], len(s['items'])))


if __name__ == '__main__':
    main()
