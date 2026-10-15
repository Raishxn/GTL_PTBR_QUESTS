import re,json
TOKEN=re.compile(r'\s+|"(?:\\.|[^"\\])*"|[{}\[\]:,]|[^\s{}\[\]:,]+')
TEXT={'title','subtitle','description','lock_message'}
class Node:
 def __init__(self,kind,start,end,value=None):self.kind,self.start,self.end,self.value=kind,start,end,value
class Reader:
 def __init__(self,text):self.text=text;self.ts=[(m.group(),m.start(),m.end()) for m in TOKEN.finditer(text) if not m.group().isspace()];self.i=0
 def pop(self):t=self.ts[self.i];self.i+=1;return t
 def parse(self):
  t,s,e=self.pop()
  if t=='{':
   fields={}
   while self.ts[self.i][0]!='}':
    k=self.pop()[0]
    if k.startswith('"'):k=json.loads(k)
    assert self.pop()[0]==':'
    fields[k]=self.parse()
    if self.ts[self.i][0]==',':self.pop()
   return Node('object',s,self.pop()[2],fields)
  if t=='[':
   values=[]
   while self.ts[self.i][0]!=']':
    values.append(self.parse())
    if self.ts[self.i][0]==',':self.pop()
   return Node('list',s,self.pop()[2],values)
  if t.startswith('"'):
   try:v=json.loads(t)
   except ValueError:v=t[1:-1]
  else:v=t
  return Node('scalar',s,e,v)
def fields(text):
 r=Reader(text)
 if not r.ts:return Node("object",0,0,{}),{}
 root=r.parse();assert r.i==len(r.ts)
 out={}
 def walk(n,path=()):
  if n.kind=='object':
   ident=n.value.get('id'); ident=ident.value if ident else '/'.join(map(str,path))
   for k,v in n.value.items():
    if k in TEXT:out[(ident,k)]=v
    walk(v,path+(k,))
  elif n.kind=='list':
   for i,v in enumerate(n.value):walk(v,path+(i,))
 walk(root);return root,out
def canonical(n):
 if n.kind=='scalar':return n.value
 if n.kind=='list':return [canonical(x) for x in n.value]
 return {k:canonical(v) for k,v in n.value.items()}
def key(n):return json.dumps(canonical(n),ensure_ascii=False,sort_keys=True)
def strings(n):
 if n.kind=='scalar':yield n.value
 elif n.kind=='list':
  for v in n.value:yield from strings(v)
 else:
  for v in n.value.values():yield from strings(v)
