#include<bits/stdc++.h>
using namespace std;
 
#define ll long long
#define int long long
#define ld long double
#define all(v) v.begin(), v.end()
#define allrev(a) a.rbegin(), a.rend()
#define fr(i,a,b) for(ll i = a; i <= b; ++i)
#define MOD 1000000007
#define vi vector<int>
#define vll vector<long long>
#define vvll vector<vector<long long>>
#define mii map<int, int>
#define mll map<long long, long long>
#define pii pair<int, int>
#define pll pair<long long, long long>
#define si set<int>
#define F first
#define S second
#define PB push_back
#define MP make_pair
#define sp << ' ' <<
#define spl << ' '
#define nl << '\n'
#define Yes cout << "YES" nl
#define No cout << "NO" nl
 
// #define TRACE
// #ifdef TRACE
// #define trace(...) _f(#__VA_ARGS, __VA_ARGS_)
// template <typename Arg1>
// void __f(const char* name, Arg1&& arg1){
//   cerr << name << " : " << arg1 << std::endl;
// }
// template <typename Arg1, typename... Args>
// void __f(const char* names, Arg1&& arg1, Args&&... args){
//   const char* comma = strchr(names + 1, ',');cerr.write(names, comma - names) << " : " << arg1<<" | ";__f(comma+1, args...);
// }
// #else
// #define trace(...)
// #endif
 
ll gcd(ll a,ll b) { if (b==0) return a; return gcd(b, a%b); }
ll lcm(ll a,ll b) { return a/gcd(a,b)*b; }
bool prime(ll a) { if (a==1) return 0; for (int i=2;i<=round(sqrt(a));++i) if (a%i==0) return 0; return 1; }
string toBinary(int n) { string r; while(n!=0) {r=(n%2==0 ?"0":"1")+r; n/=2;} return r; }
ll modadd(ll a, ll b) { return ((a%MOD)+(b%MOD))%MOD; } 
ll modmul(ll a, ll b) { return ((a%MOD)*(b%MOD))%MOD; } 
ll binExp(ll a, ll n) { ll res=1; while(n>0){if(n%2){res=modmul(res,a);n--;}else{a=modmul(a,a);n/=2;}} return res; }
ll modinv(ll a, ll p) { return binExp(a,p-2); } ;
ll moddiv(ll a, ll b) { return modmul(a,modinv(b,MOD));} ;

signed main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    ll tt=1;
    cin>>tt;
    while(tt--) {
        ll n , ans=0 ;
        cin>>n ;
        vll a(n+1) ;
        ll dp[n+1][3] = {} ;
        fr(i,1,n) { cin>>a[i] ; a[i]%=3 ; }
        ll last3 = (a[1]+a[2]+a[3])%3 ;
        
        fr(i,3,n) {
            if(last3==1) {
                dp[i][0] = min({dp[i-1][2]+dp[i-2][0] ,dp[i-1][1]+dp[i-2][1], dp[i-1][0]+dp[i-2][2]}) ;
                dp[i][1] = 1+min({dp[i-1][1]+dp[i-2][0] ,dp[i-1][0]+dp[i-2][1]}) ;
                dp[i][2] = 1+min({dp[i-1][0]+dp[i-2][0]}) ;
            }
            else if(last3==2) {
                dp[i][2] = 1+min({dp[i-1][2]+dp[i-2][0] ,dp[i-1][1]+dp[i-2][1], dp[i-1][0]+dp[i-2][2]}) ;
                dp[i][0] = min({dp[i-1][1]+dp[i-2][0] ,dp[i-1][0]+dp[i-2][1]}) ;
                dp[i][1] = 1+min({dp[i-1][0]+dp[i-2][0]}) ;
            }
            else {
                dp[i][0] = min({dp[i-1][2] ,dp[i-1][1], dp[i-1][0]}) ;
                dp[i][1] = 1+min({dp[i-1][2] ,dp[i-1][1], dp[i-1][0]}) ;
                dp[i][2] = 1+min({dp[i-1][2] ,dp[i-1][1], dp[i-1][0]}) ;
            }
        }
        ans = min({dp[n][0],dp[n][1],dp[n][2]}) ;
        cout<<ans<<endl ;
    }
    return 0;
}