import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Header from './components/Header';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import PostJob from './components/PostJob';
import SearchBar from './components/SearchBar';
import SortSelect from './components/SortSelect';
import Pagination from './components/Pagination';
import CategoryFilter from './components/CategoryFilter';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import ApplicationHistory from './components/ApplicationHistory';
import EmployerJobManagement from './components/EmployerJobManagement';
import ChangePassword from './components/ChangePassword';
import ApplicationManagement from './components/ApplicationManagement';
import AdvancedSearch from './components/AdvancedSearch';
import BookmarkedJobs from './components/BookmarkedJobs';
import { sendNewJobNotification, sendNewApplicationNotification, sendApplicationStatusUpdateNotification } from './utils/emailService';

// Lazy load the Messaging component
const Messaging = lazy(() => import('./components/Messaging'));

function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [applications, setApplications] = useState([]);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setBookmarkedJobs(foundUser.bookmarkedJobs || []);
    }

    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    if (storedJobs.length === 0) {
      const initialJobs = [
        { id: 1, title: "Webデベロッパー", company: "テックカンパニー", location: "東京", description: "JavaScriptとReactの経験が必要です。", date: new Date().toISOString(), category: "IT", employerId: "1", salary: 400000, jobType: "フルタイム", experienceLevel: "中級" },
        { id: 2, title: "データアナリスト", company: "データ株式会社", location: "大阪", description: "SQLとPythonのスキルが求められます。", date: new Date().toISOString(), category: "データ", employerId: "2", salary: 350000, jobType: "フルタイム", experienceLevel: "エントリー" },
        { id: 3, title: "UXデザイナー", company: "クリエイティブスタジオ", location: "福岡", description: "ユーザー中心設計の経験が必要です。", date: new Date().toISOString(), category: "デザイン", employerId: "3", salary: 380000, jobType: "契約", experienceLevel: "シニア" }
      ];
      setJobs(initialJobs);
      localStorage.setItem('jobs', JSON.stringify(initialJobs));
    } else {
      setJobs(storedJobs);
    }

    const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(storedApplications);

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setAllUsers(storedUsers);
  }, []);

  const handleApply = useCallback((jobId) => {
    const newApplication = {
      id: Date.now(),
      jobId: jobId,
      applicantId: user.id,
      applicantName: user.username,
      applicationDate: new Date().toISOString(),
      status: 'pending',
      resume: user.resume
    };
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    
    const job = jobs.find(j => j.id === jobId);
    const employer = allUsers.find(u => u.id === job.employerId);
    sendNewApplicationNotification(newApplication, job, employer);
    
    console.log(`Job ${jobId} に応募しました`);
  }, [applications, user, jobs, allUsers]);

  const handleUpdateApplicationStatus = useCallback((applicationId, newStatus) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));

    const updatedApplication = updatedApplications.find(app => app.id === applicationId);
    const job = jobs.find(j => j.id === updatedApplication.jobId);
    const applicant = allUsers.find(u => u.id === updatedApplication.applicantId);
    sendApplicationStatusUpdateNotification(updatedApplication, job, applicant);
  }, [applications, jobs, allUsers]);

  const addJob = useCallback((newJob) => {
    const jobWithId = { ...newJob, id: Date.now(), date: new Date().toISOString(), employerId: user.id };
    const updatedJobs = [...jobs, jobWithId];
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));

    const jobSeekers = allUsers.filter(u => u.role === 'jobseeker');
    sendNewJobNotification(jobWithId, jobSeekers);
  }, [jobs, user, allUsers]);

  const editJob = useCallback((id, updatedJob) => {
    const updatedJobs = jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  }, [jobs]);

  const deleteJob = useCallback((id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  }, [jobs]);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setBookmarkedJobs(userData.bookmarkedJobs || []);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setBookmarkedJobs([]);
    localStorage.removeItem('user');
  }, []);

  const handleUpdateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const updatedUsers = allUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
    setAllUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }, [allUsers]);

  const handleChangePassword = useCallback((currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.password === currentPassword) {
        const updatedUser = { ...storedUser, password: newPassword };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        resolve();
      } else {
        reject(new Error('現在のパスワードが正しくありません。'));
      }
    });
  }, []);

  const handleAdvancedSearch = useCallback((filters) => {
    setAdvancedFilters(filters);
    setCurrentPage(1);
  }, []);

  const handleBookmark = useCallback((jobId) => {
    setBookmarkedJobs(prev => {
      let updatedBookmarks;
      if (prev.includes(jobId)) {
        updatedBookmarks = prev.filter(id => id !== jobId);
      } else {
        updatedBookmarks = [...prev, jobId];
      }
      const updatedUser = { ...user, bookmarkedJobs: updatedBookmarks };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedBookmarks;
    });
  }, [user]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || job.category === categoryFilter;
      
      const matchesAdvancedFilters = 
        (!advancedFilters.location || job.location.toLowerCase().includes(advancedFilters.location.toLowerCase())) &&
        (!advancedFilters.category || job.category === advancedFilters.category) &&
        (!advancedFilters.minSalary || job.salary >= parseInt(advancedFilters.minSalary)) &&
        (!advancedFilters.maxSalary || job.salary <= parseInt(advancedFilters.maxSalary)) &&
        (!advancedFilters.jobType || job.jobType === advancedFilters.jobType) &&
        (!advancedFilters.experienceLevel || job.experienceLevel === advancedFilters.experienceLevel);

      return matchesSearch && matchesCategory && matchesAdvancedFilters;
    });
  }, [jobs, searchTerm, categoryFilter, advancedFilters]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      switch (sortCriteria) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });
  }, [filteredJobs, sortCriteria]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const debouncedSetSearchTerm = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  return (
    <Router basename="/jobmatch">
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar searchTerm={searchTerm} setSearchTerm={debouncedSetSearchTerm} />
              <AdvancedSearch onSearch={handleAdvancedSearch} />
              <CategoryFilter categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
              <SortSelect sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
              <JobList 
                jobs={currentJobs} 
                onEdit={editJob} 
                onDelete={deleteJob} 
                onBookmark={handleBookmark}
                bookmarkedJobs={bookmarkedJobs}
                user={user}
              />
              <Pagination
                jobsPerPage={jobsPerPage}
                totalJobs={sortedJobs.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          } />
          <Route path="/job/:id" element={
            <JobDetail 
              jobs={jobs} 
              onApply={handleApply} 
              user={user} 
              onBookmark={handleBookmark}
              bookmarkedJobs={bookmarkedJobs}
            />
          } />
          <Route path="/post-job" element={user && user.role === 'employer' ? <PostJob addJob={addJob} /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/profile" element={<UserProfile user={user} onUpdateUser={handleUpdateUser} />} />
          <Route path="/applications" element={user ? <ApplicationHistory applications={applications.filter(app => app.applicantId === user.id)} jobs={jobs} /> : <Navigate to="/login" />} />
          <Route path="/manage-jobs" element={user && user.role === 'employer' ? <EmployerJobManagement jobs={jobs} onDelete={deleteJob} /> : <Navigate to="/login" />} />
          <Route path="/change-password" element={user ? <ChangePassword onChangePassword={handleChangePassword} /> : <Navigate to="/login" />} />
          <Route path="/manage-applications" element={user && user.role === 'employer' ? 
            <ApplicationManagement 
              applications={applications.filter(app => jobs.some(job => job.employerId === user.id && job.id === app.jobId))} 
              jobs={jobs} 
              onUpdateStatus={handleUpdateApplicationStatus} 
            /> : <Navigate to="/login" />} 
          />
          <Route path="/messaging" element={
            user ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Messaging user={user} allUsers={allUsers} />
              </Suspense>
            ) : <Navigate to="/login" />
          } />
          <Route path="/bookmarked-jobs" element={user ? 
            <BookmarkedJobs 
              bookmarkedJobs={bookmarkedJobs} 
              jobs={jobs} 
              removeBookmark={handleBookmark} 
            /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;