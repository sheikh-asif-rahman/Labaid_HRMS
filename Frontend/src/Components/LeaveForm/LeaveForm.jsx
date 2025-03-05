import React, { useRef } from 'react';
import './LeaveForm.css';

const LeaveForm = ({ employee, leaveData }) => {
  const formRef = useRef();
  return (
    <div>
      {/* Leave Form Content */}
      <div ref={formRef} className="leave-form">
        <div className="header">
          LABAID GROUP
          <br />
          Leave/Attendance Application Form
        </div>

        {/* First Table */}
        <table className="first-table">
          <tbody>
            <tr>
              <td>Emp. Code : {employee.empCode}</td>
              <td rowSpan="4" className="joining-date">Joining date : {employee.joiningDate}</td>
            </tr>
            <tr>
              <td>Emp. Name : {employee.empName}</td>
            </tr>
            <tr>
              <td>Designation : {employee.designation}</td>
            </tr>
            <tr>
              <td>Department : {employee.department}</td>
            </tr>
          </tbody>
        </table>

        {/* Second Table */}
        <div className="section">
          <table className="second-table">
            <tbody>
              <tr>
                <td>Duty Hours</td>
                <td className="vertical-border">9</td>
                <td>Total Leave:</td>
                <td>20 Days</td>
                <td>0 Hrs.</td>
                <td>0 Min.</td>
              </tr>
              <tr>
                <td>Total Working Days</td>
                <td className="vertical-border">0</td>
                <td>Leave enjoyed:</td>
                <td>{leaveData.leaveEnjoyedDays} Days</td>
                <td>0 Hrs.</td>
                <td>0 Min.</td>
              </tr>
              <tr>
                <td>Total Present Days</td>
                <td className="vertical-border">0</td>
                <td>Leave Balance:</td>
                <td>{leaveData.leaveBalanceDays} Days</td>
                <td>0 Hrs.</td>
                <td>0 Min.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Third Table */}
        <div className="section">
          <table className="third-table">
            <tbody>
              <tr>
                <th colSpan="2">Leave Approved</th>
                <th colSpan="6" className="leave-enjoyed">Leave Enjoyed</th>
                <th>Reason</th>
              </tr>
              <tr>
                <th className="no-inner-border">Leave Type</th>
                <th>Days</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Fr.Time</th>
                <th>To Time</th>
                <th>Days</th>
                <th>Time</th>
                <th className="reason-no-border"></th>
              </tr>
              <tr>
                <td className="leave-type no-inner-border">Annual Leave</td>
                <td>20</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>0</td>
                <td>00</td>
                <td>Opening</td>
              </tr>
              <tr>
                <td className="leave-type no-inner-border">Out of Office</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>0</td>
                <td>00</td>
                <td>Opening</td>
              </tr>
              <tr>
                <td className="leave-type no-inner-border">Casual Leave</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>0</td>
                <td>00</td>
                <td>Opening</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Leave Required and Purpose of Leave */}
        <div className="purpose">
          <p>Dear Concern,</p>
          <p>
            I would like to inform you that I require leave for{' '}
            <span style={{ textDecoration: 'underline' }}>{leaveData.leaveRequiredDays}</span> day(s), from{' '}
            <span style={{ textDecoration: 'underline' }}>{leaveData.leaveStartDate}</span> to{' '}
            <span style={{ textDecoration: 'underline' }}>{leaveData.leaveEndDate}</span>.
          </p>
          <p>
            The purpose of my leave is{' '}
            <span style={{ textDecoration: 'underline' }}>{leaveData.purposeOfLeave}</span>.
          </p>
          <p>
            During my absence, Mr/Mrs{' '}
            <span style={{ textDecoration: 'underline' }}>{leaveData.chargePerson}</span> will take charge of my
            responsibilities.
          </p>
          <p>Thank you for your consideration.</p>
        </div>

        {/* Empty 3 Lines */}
        <div style={{ marginTop: '30px' }}>
          <br />
          <br />
          <br />
        </div>

        {/* Signature Section */}
        <div className="signature">
          <table>
            <tbody>
              <tr>
                <td>________________________</td>
                <td className="right-align">________________________</td>
              </tr>
              <tr>
                <td>Applicant’s Signature</td>
                <td className="right-align">Dept. In-Charge</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Office Use Section */}
        <div className="office-use">
          <p>OFFICE USE ONLY</p>
          <hr />
          <p>
            Leave Sanctioned .................. day(s) from ........../........../............ to
            .........../.........../............
          </p>
          <div className="signature">
            <table>
              <tbody>
                <tr>
                  <td>________________________</td>
                  <td className="right-align">________________________</td>
                </tr>
                <tr>
                  <td>(Admin Officer)</td>
                  <td className="right-align">Branch Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
