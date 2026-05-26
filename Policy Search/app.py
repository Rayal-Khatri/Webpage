from flask import Flask, render_template, request
import pyodbc

app = Flask(__name__)

# ── Change these to match your SQL Server ──────────────────────────
CONN_STR = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=202.51.75.99;"      # e.g. localhost or 192.168.1.10
    "DATABASE=iSolutionLife_RBS_Migration;"
    "UID=report_reader;"
    "PWD=SzK@RW/Ex}-u/p;"
    # If using Windows Auth instead, replace UID/PWD with:
    # "Trusted_Connection=yes;"
)
# ──────────────────────────────────────────────────────────────────
def get_results(filters):
    conn = pyodbc.connect(CONN_STR)
    cursor = conn.cursor()

    conditions = []
    params = []

    if filters.get("doc"):
        conditions.append("doc = ?")
        params.append(filters["doc"])

    if filters.get("mobile"):
        conditions.append("Mobile = ?")
        params.append(filters["mobile"])

    if filters.get("policy_no"):
        conditions.append("PolicyNo = ?")
        params.append(filters["policy_no"])

    if filters.get("full_name"):
        words = filters["full_name"].split()
        if len("".join(words)) < 3:
            conn.close()
            return [], []
        for word in words:
            conditions.append("UPPER(FullName) LIKE UPPER(?)")
            params.append(f"%{word}%")

    if filters.get("dob_year"):
        conditions.append("SUBSTRING(CAST(dob AS NVARCHAR(50)), 1, 4) = ?")
        params.append(filters["dob_year"])

    if filters.get("district"):
        conditions.append("DistrictID = ?")
        params.append(filters["district"].upper())

    where_clause = "WHERE " + " AND ".join(conditions) if conditions else ""

    query = f"""
        WITH X AS (
            SELECT CONCAT_WS(' ', FirstName, middlename, LastName, NomineeName) FullName,
                   tid.*, tpd.CurrentStatus, tpd.maturitydate, tpd.AgentCode Code,
                   sa, Premium, fup,term= concat_ws('/', term, Instalment), doc
            FROM tblInsuredDetail tid
            INNER JOIN tblPolicyDetail tpd ON tid.PolicyNo = tpd.PolicyNo
        )
        SELECT TOP 50 doc, Mobile, EngFatherName, dob, sa, Premium, Code,
               CurrentStatus, maturitydate, fup, term, PolicyNo, FullName,
               DistrictID, MunicipalityID, EngStreetName
        FROM X
        {where_clause}
        ORDER BY FullName
    """

    cursor.execute(query, params)
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    conn.close()
    return columns, [list(row) for row in rows]


@app.route("/", methods=["GET", "POST"])
def index():
    columns, rows, error = [], [], None
    filters = {}

    if request.method == "POST":
        filters = {
            "doc":       request.form.get("doc", "").strip(),
            "mobile":    request.form.get("mobile", "").strip(),
            "policy_no": request.form.get("policy_no", "").strip(),
            "full_name": request.form.get("full_name", "").strip(),
            "dob_year":  request.form.get("dob_year", "").strip(),
            "district":  request.form.get("district", "").strip(),
        }
        filters = {k: v for k, v in filters.items() if v}

        if not filters:
            error = "Please enter at least one search value."
        else:
            try:
                columns, rows = get_results(filters)
                if not rows:
                    error = "No records found."
            except Exception as e:
                error = f"Database error: {e}"

    return render_template("index.html", columns=columns, rows=rows,
                           error=error, filters=filters, count=len(rows))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)