import pandas as pd

from sqlalchemy.orm import Session
from sqlalchemy import create_engine

connect_string = "sqlite:///Resources/winedb2.db"

engine = create_engine(connect_string)

def winery_average():

    session = Session(engine)
    sql = '''
    SELECT winery, count(name) wines, avg(points) avg_points
FROM wine
group by winery having count(name)>2 and avg(points)>94
order by avg(points) DESC;
    '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")     


if __name__ == "__main__":
    results = winery_average()
    print(results)






