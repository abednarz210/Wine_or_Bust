import pandas as pd

from sqlalchemy.orm import Session
from sqlalchemy import create_engine

connect_string = "sqlite:///Resources/winedb2.db"

engine = create_engine(connect_string)

def top_wineries():

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


def wine_data():

    session = Session(engine)
    sql = '''
    select name, variety, winery, region, state, description, points, price
    from wine
    order by state, region, winery, variety, name, points;
    '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")    

def winery_data():

    session = Session(engine)
    sql = '''
    SELECT winery, count(name) wines, avg(points) avg_points, region, state
    FROM wine
    group by winery
    order by state, region, winery;
    '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")

def total_wines():

    session = Session(engine)
    sql = '''
    SELECT COUNT ( DISTINCT name ) AS "total_wines" 
    FROM wine;
    '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")

def total_varieties():

    session = Session(engine)
    sql = '''
    SELECT COUNT ( DISTINCT variety) AS "total_varieties" 
    FROM wine;
    '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")

def total_wineries():

    session = Session(engine)
    sql = '''
    SELECT COUNT ( DISTINCT winery) AS "total_wineries" 
    FROM wine;
    '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")

def total_regions():

    session = Session(engine)
    sql = '''
    SELECT COUNT ( DISTINCT region) AS "total_regions" 
    FROM wine;
    '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")

def filtered_top_wine(flavor='all', region='all'): 
    
    session = Session(engine)

    if flavor == 'all' and region == 'all':

        sql = '''
        select name, points, price, variety, winery, description, region, state
        from wine
        where price is not null
        order by points DESC, price
        limit 20;
        '''

    elif flavor != 'all' and region =='all': 

        sql = '''
        select name, points, price, variety, winery, description, region, state
        from wine
        where price is not null
        and description LIKE '% {flavor} %'
        order by points DESC, price
        limit 20;
        '''

    elif flavor == 'all' and region !='all': 

        sql = '''
        select name, points, price, variety, winery, description, region, state
        from wine
        where price is not null
        and region == '{region}'
        order by points DESC, price
        limit 20;
        '''

    else: 

        sql = '''
        select name, points, price, variety, winery, description, region, state
        from wine
        where price is not null
        and description LIKE '% {flavor} %'
        and region == '{region}'
        order by points DESC, price
        limit 20;
        '''

    df = pd.read_sql(sql, session.connection())

    session.close()  
    return df.to_dict(orient="records")

if __name__ == "__main__":
    results = filtered_top_wine('all','Russion River Valley')
    print(results)






