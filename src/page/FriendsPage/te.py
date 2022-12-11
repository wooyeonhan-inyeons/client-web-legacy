import pandas as pd

import matplotlib.pyplot as plt

# 한글폰트 사용시 그래프에서 마이너스 폰트 깨지는 문제에 대한 대처

plt.rcParams['axes.unicode_minus'] = False

plt.rc('font', family='Malgun Gothic') 

styles = ['-', '--', '-.', ':']

pd.set_option('mode.chained_assignment',  None)

#

#

fig = plt.figure()

df = pd.read_csv('2021-univ-HR.txt',sep='\t',encoding='EUC-KR')

fig.suptitle('비정규직 versus 정규직', color='navy')

#(2, 2, 1) plot

df1=df.loc[:,["설립", "정규-전담-계", "정규-겸직-계", "비정규-전담-계", "비정규-겸직-계"]]

df2=pd.melt(df1, id_vars =['설립'])

df3=df2.groupby(['설립','variable']).mean().reset_index()

df3.set_index("설립", inplace=True)

#(2, 2, 2) plot

df4=df.loc[:,["학교유형", "정규-전담-계", "정규-겸직-계", "비정규-전담-계", "비정규-겸직-계"]]

df5=pd.melt(df4, id_vars =['학교유형'])

df6=df5.groupby(['학교유형','variable']).mean().reset_index()

df6.set_index("학교유형", inplace=True)

#(2, 2, 3) plot

df7=df.loc[:,["지역", "정규-전담-계", "정규-겸직-계", "비정규-전담-계", "비정규-겸직-계"]]

df8=pd.melt(df7, id_vars =['지역'])

df9=df8.groupby(['지역','variable']).mean().reset_index()

df9.set_index("지역", inplace=True)

#(2, 2, 4) plot

df10=df.loc[:,["대학규모", "정규-전담-계", "정규-겸직-계", "비정규-전담-계", "비정규-겸직-계"]]

df11=pd.melt(df10, id_vars =['대학규모'])

df12=df11.groupby(['대학규모','variable']).mean().reset_index()

df12.set_index("대학규모", inplace=True)

#

ax1 = fig.add_subplot(2, 2, 1)
ax1.set_ylabel("계", color='teal')
ax1.set_xlabel("설립", color='lightseagreen')
ax1=df3.groupby("variable")["value"].plot(legend=True)
plt.grid(True, color = 'black', alpha = 0.1)

#

ax2 = fig.add_subplot(2, 2, 2)
ax2.set_ylabel("계", color='teal')
ax2.set_xlabel("학교유형", color='lightseagreen')
ax2=df6.groupby("variable")["value"].plot(legend=True)
plt.grid(True, color = 'black', alpha = 0.1)

#

ax3 = fig.add_subplot(2, 2, 3)
ax3.set_ylabel("계", color='teal')
ax3.set_xlabel("지역", color='lightseagreen')
ax3=df9.groupby("variable")["value"].plot(legend=True)
plt.grid(True, color = 'black', alpha = 0.1)

#

ax4 = fig.add_subplot(2, 2, 4)
ax4.set_ylabel("계", color='teal')
ax4.set_xlabel("대학규모", color='lightseagreen')
ax4=df12.groupby("variable")["value"].plot(legend=True)
plt.grid(True, color = 'black', alpha = 0.1)

plt.show()