import React, { useState } from "react";

const App = () => {
    const [peopleData, setPeopleData] = useState({});

    return (
        <div className='HrInfoTable'>
        
        <div className='info_Table'>
            {!peopleData ? ("No data found") : (
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2}>사번</th>
                            <th rowSpan={2}>성명</th>
                            <th colSpan={12}>AM</th>
                            <th colSpan={12}>PM</th>
                        </tr>
                        <tr>
                            <th>12</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>

                            <th>12</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1012210000</td>
                            <td>이정재</td>
                            
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td colSpan={2} style={{backgroundColor:"lightblue"}}>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                            <td>11</td>
                            <td>12</td>
                            <td>13</td>

                            <td>14</td>
                            <td>15</td>
                            <td>16</td>
                            <td>17</td>
                            <td>18</td>
                            <td>19</td>
                            <td>20</td>
                            <td>21</td>
                            <td>22</td>
                            <td>23</td>
                            <td>24</td>
                            <td>25</td>
                        </tr>
                    </tbody>
                </table>
            )
}
        </div>
    </div>
    )
}

export default App;